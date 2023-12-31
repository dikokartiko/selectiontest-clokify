//controllers/schedule.js
const { Schedule } = require("../models");

const createSchedule = async (req, res) => {
  const { userId } = req.params;
  const { clockIn, clockOut, workday } = req.body;
  try {
    const existingSchedule = await Schedule.findOne({
      where: { userId, workday },
    });
    if (existingSchedule) {
      return res
        .status(400)
        .json({ error: `A schedule already exists for ${workday}` });
    }
    await Schedule.create({
      userId,
      clockIn,
      clockOut,
      workday,
    });
    res.status(201).json({ message: "Schedule created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSchedule = async (req, res) => {
  const { userId, day, sort } = req.query;
  try {
    const schedules = await Schedule.findAll({
      where: { userId, workday: day },
      order: sort ? [[sort, "ASC"]] : [],
    });
    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSchedule = async (req, res) => {
  const { scheduleId } = req.params;
  const { clockIn, clockOut, workday } = req.body;
  try {
    const schedule = await Schedule.findOne({ where: { scheduleId } });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    await Schedule.update(
      { clockIn, clockOut, workday },
      { where: { scheduleId } }
    );
    res.status(200).json({ message: "Schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const schedule = await Schedule.findOne({ where: { scheduleId } });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    await Schedule.destroy({ where: { scheduleId } });
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
