// controller/payrollcontroller
const { Payroll, Attendance, Salary } = require("../models");
const { Op } = require("sequelize");

const getPayrollReport = async (req, res) => {
  const { userId } = req;
  const { startDate, endDate } = req.query;

  try {
    // Find the user's salary
    const salary = await Salary.findOne({ where: { userId } });
    if (!salary) {
      return res.status(404).json({ error: "Salary not found" });
    }

    // Find the user's payroll deductions
    const payrollDeductions = await Payroll.findAll({
      where: {
        userId,
        payday: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    // Find the user's attendance records
    const attendanceRecords = await Attendance.findAll({
      where: {
        userId,
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    // Calculate the total deductions
    let totalDeductions = 0;
    for (const deduction of payrollDeductions) {
      totalDeductions += deduction.deductionTotal;
    }

    // Calculate the attendance deductions
    let lateDeductions = 0;
    let earlyDeductions = 0;
    let absentDeductions = 0;
    for (const attendance of attendanceRecords) {
      if (attendance.lateClockin) {
        lateDeductions += salary.amount * 0.01;
      }
      if (attendance.earlyClockOut) {
        earlyDeductions += salary.amount * 0.01;
      }
      if (attendance.absent) {
        absentDeductions += salary.amount * 0.05;
      }
    }

    // Calculate the net salary
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
