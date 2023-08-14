const express = require("express");
const checkToken = require("../middleware/isLogin");
const {
  clockIn,
  clockOut,
  getAttendanceHistory,
  getAttendanceReport,
} = require("../controllers/attendanceController");
const router = express.Router();

router.post("/clock-in", checkToken, clockIn);
router.post("/clock-out", checkToken, clockOut);
router.get("/history", checkToken, getAttendanceHistory);
router.get(
  "/attendance-report/:userId/:startDate/:endDate",
  getAttendanceReport
);

module.exports = router;
