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

const clockIn = async (req, res) => {
  const { userId } = req;
  const { time } = req.body;

  try {
    // Get the current date in the local time zone
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    // Find the user's schedule for the current day
    const dayOfWeek = days[now.getDay()];
    const schedule = await Schedule.findOne({
      where: { userId, workday: dayOfWeek },
    });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    // Check if the user has already clocked in for the current day
    const existingAttendance = await Attendance.findOne({
      where: { userId, date },
    });
    if (existingAttendance) {
      return res.status(400).json({ error: "Already clocked in" });
    }

    // Create a new attendance record
    const [hours, minutes] = time.split(":");
    now.setHours(parseInt(hours));
    now.setMinutes(parseInt(minutes));
    const localeTime = now.toLocaleTimeString();

    console.log(time);
    const attendanceRes = await Attendance.create({
      userId,
      date,
      clockIn: time,
      scheduleId: schedule.scheduleId,
    });

    // Check if the user is late
    if (attendanceRes.clockIn > schedule.clockIn) {
      await Attendance.update(
        { lateClockin: 1 },
        { where: { attendanceId: attendanceRes.attendanceId } }
      );
    } else {
      // If the user is not late, set ontime to true
      await Attendance.update(
        { ontime: 1 },
        { where: { attendanceId: attendanceRes.attendanceId } }
      );
    }

    res.status(201).json({ message: "Clocked in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clockOut = async (req, res) => {
  const { userId } = req;
  const { time } = req.body;

  try {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    // Find the user's attendance record for the given date
    const attendance = await Attendance.findOne({
      where: { userId, date },
    });
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    // Check if the user has already clocked out for the given date
    if (attendance.clockOut) {
      return res.status(400).json({ error: "Already clocked out" });
    }

    // Update the attendance record with the clock out time
    await Attendance.update(
      { clockOut: time },
      { where: { attendanceId: attendance.attendanceId } }
    );

    // Check if the user is early
    const schedule = await Schedule.findOne({
      where: { scheduleId: attendance.scheduleId },
    });
    if (time < schedule.clockOut) {
      await Attendance.update(
        { earlyClockOut: 1 },
        { where: { attendanceId: attendance.attendanceId } }
      );
    }

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
