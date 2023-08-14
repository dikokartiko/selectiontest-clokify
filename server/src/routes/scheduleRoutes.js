const express = require("express");
const {
  createSchedule,
  updateSchedule,
  getSchedule,
  deleteSchedule,
} = require("../controllers/schedule");
const isAdmin = require("../middleware/isAdmin");
const checkToken = require("../middleware/isLogin");
const router = express.Router();

router.post("/:userId", isAdmin, createSchedule);
router.get("/", checkToken, getSchedule);
router.patch("/:scheduleId", isAdmin, updateSchedule);
router.delete("/:scheduleId", isAdmin, deleteSchedule);
module.exports = router;
