// controller/payrollcontroller
const { Payroll, Attendance, Salary } = require("../models");
const { Op } = require("sequelize");

const getSalary = async (userId) => {
  const salary = await Salary.findOne({ where: { userId } });
  if (!salary) {
    throw new Error("Salary not found");
  }
  return salary;
};

const getPayrollDeductions = async (userId, startDate, endDate) => {
  const payrollDeductions = await Payroll.findAll({
    where: {
      userId,
      payday: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
  });
  return payrollDeductions;
};

const getAttendanceRecords = async (userId, startDate, endDate) => {
  const attendanceRecords = await Attendance.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
  });
  return attendanceRecords;
};

const calculateTotalDeductions = (payrollDeductions) => {
  let totalDeductions = 0;
  for (const deduction of payrollDeductions) {
    totalDeductions += deduction.deductionTotal;
  }
  return totalDeductions;
};

const calculateAttendanceDeductions = (attendanceRecords, salaryAmount) => {
  let lateDeductions = 0;
  let earlyDeductions = 0;
  let absentDeductions = 0;
  for (const attendance of attendanceRecords) {
    if (attendance.lateClockin) {
      lateDeductions += salaryAmount * 0.01;
    }
    if (attendance.earlyClockOut) {
      earlyDeductions += salaryAmount * 0.01;
    }
    if (attendance.absent) {
      absentDeductions += salaryAmount * 0.05;
    }
  }
  return { lateDeductions, earlyDeductions, absentDeductions };
};

const getPayrollReport = async (req, res) => {
  const { userId } = req;
  const { startDate, endDate } = req.query;

  try {
    let salary;
    try {
      salary = await getSalary(userId);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }

    const payrollDeductions = await getPayrollDeductions(
      userId,
      startDate,
      endDate
    );

    const attendanceRecords = await getAttendanceRecords(
      userId,
      startDate,
      endDate
    );

    const totalDeductions = calculateTotalDeductions(payrollDeductions);

    const { lateDeductions, earlyDeductions, absentDeductions } =
      calculateAttendanceDeductions(attendanceRecords, salary.amount);

    const netSalary =
      salary.amount -
      totalDeductions -
      lateDeductions -
      earlyDeductions -
      absentDeductions;

    res.status(200).json({
      salary: salary.amount,
      deductions: totalDeductions,
      lateDeductions,
      earlyDeductions,
      absentDeductions,
      netSalary,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPayrollReport,
};
