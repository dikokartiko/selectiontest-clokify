const express = require("express");
const authRoutes = require("./authRoutes");
const scheduleRoutes = require("./scheduleRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const payrollRoutes = require("./payrollRoutes");
// Add any new routes here
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/payroll", payrollRoutes);
// Add any new routes here

module.exports = router;
