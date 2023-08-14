const { Attendance, Schedule, User } = require("../models");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getSchedule = async (userId, dayOfWeek) => {
  const schedule = await Schedule.findOne({
    where: { userId, workday: dayOfWeek },
  });
  if (!schedule) {
    throw new Error("Schedule not found");
  }
  return schedule;
};

const checkExistingAttendance = async (userId, date) => {
  const existingAttendance = await Attendance.findOne({
    where: { userId, date },
  });
  if (existingAttendance) {
    throw new Error("Already clocked in");
  }
};

const createAttendance = async (userId, date, time, scheduleId) => {
  const [hours, minutes] = time.split(":");
  const now = new Date();
  now.setHours(parseInt(hours));
  now.setMinutes(parseInt(minutes));

  const attendanceRes = await Attendance.create({
    userId,
    date,
    clockIn: time,
    scheduleId,
  });

  return attendanceRes;
};

const updateAttendanceStatus = async (attendanceRes, schedule) => {
  if (attendanceRes.clockIn > schedule.clockIn) {
    await Attendance.update(
      { lateClockin: 1 },
      { where: { attendanceId: attendanceRes.attendanceId } }
    );
  } else {
    await Attendance.update(
      { ontime: 1 },
      { where: { attendanceId: attendanceRes.attendanceId } }
    );
  }
};

const clockIn = async (req, res) => {
  const { userId } = req;
  const { time } = req.body;

  try {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const dayOfWeek = days[now.getDay()];

    let schedule;
    try {
      schedule = await getSchedule(userId, dayOfWeek);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }

    try {
      await checkExistingAttendance(userId, date);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const attendanceRes = await createAttendance(
      userId,
      date,
      time,
      schedule.scheduleId
    );

    await updateAttendanceStatus(attendanceRes, schedule);

    res.status(201).json({ message: "Clocked in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendance = async (userId, date) => {
  const attendance = await Attendance.findOne({
    where: { userId, date },
  });
  if (!attendance) {
    throw new Error("Attendance not found");
  }
  return attendance;
};

const checkExistingClockOut = (attendance) => {
  if (attendance.clockOut) {
    throw new Error("Already clocked out");
  }
};

const updateClockOut = async (attendanceId, time) => {
  await Attendance.update({ clockOut: time }, { where: { attendanceId } });
};

const updateEarlyClockOutStatus = async (attendance, time) => {
  const schedule = await Schedule.findOne({
    where: { scheduleId: attendance.scheduleId },
  });
  if (time < schedule.clockOut) {
    await Attendance.update(
      { earlyClockOut: 1 },
      { where: { attendanceId: attendance.attendanceId } }
    );
  }
};

const clockOut = async (req, res) => {
  const { userId } = req;
  const { time } = req.body;

  try {
    const now = new Date();
    const date = now.toISOString().split("T")[0];

    let attendance;
    try {
      attendance = await getAttendance(userId, date);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }

    try {
      checkExistingClockOut(attendance);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    await updateClockOut(attendance.attendanceId, time);

    await updateEarlyClockOutStatus(attendance, time);

    res.status(200).json({ message: "Clocked out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceHistory = async (req, res) => {
  const { userId } = req;
  const { sortOrder, orderBy } = req.query;

  try {
    // Find the user's attendance history
    const attendanceHistory = await Attendance.findAll({
      where: { userId },
      order: [[orderBy || "attendanceId", sortOrder || "DESC"]],
    });

    res.status(200).json({ attendanceHistory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceReport = async (req, res) => {
  const { userId, startDate, endDate } = req.params;
  try {
    const report = await getAttendanceReport(userId, startDate, endDate);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getAttendanceHistory,
  getAttendanceReport,
};
