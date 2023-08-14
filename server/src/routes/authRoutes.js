//routes/authRoutes.js
const express = require("express");
const {
  register,
  login,
  resetPassword,
  setSalary,
  keepLogin,
} = require("../controllers/auth");
const { registerValidation } = require("../middleware/register");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();
const passwordValidation = require("../middleware/passwordValidation");

router.post("/register", registerValidation, isAdmin, register);

router.post("/login", login);

router.patch("/reset-password/:token", passwordValidation, resetPassword);

router.patch("/set-salary/:userId", isAdmin, setSalary);

router.get("/", keepLogin);
module.exports = router;
