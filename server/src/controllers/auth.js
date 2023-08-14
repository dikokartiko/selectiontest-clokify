//controllers/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User, Role, Salary } = require("../models");
const { sendMail } = require("../helpers/mailer");

const SALT_ROUNDS = 10;

const checkExistingUser = async (phoneNumber, email) => {
  const existingUser = await User.findOne({ where: { phoneNumber } });
  const existingEmail = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Phone number already in use");
  }
  if (existingEmail) {
    throw new Error("Email already in use");
  }
};

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const createSalary = async (userId, salaryAmount) => {
  await Salary.create({
    amount: salaryAmount,
    userId,
  });
};

const handleEmployeeRegistration = async (user, fullname, email) => {
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
  await User.update({ token }, { where: { userId: user.userId } });

  const subject = "Welcome to the Company!";
  const text = `Dear ${fullname},\n\nWelcome to the company! As a new employee, you are required to set a new password for your account. Please follow this link to set your new password: ${process.env.BASE_URL}/reset-password/${token}\n\nPlease note that this link can only be used once. If you need to reset your password again in the future, please contact an administrator.\n\nBest regards,\nThe Company`;

  sendMail(email, subject, text);
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const userData = req.body;
  try {
    try {
      await checkExistingUser(userData.phoneNumber, userData.email);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await createUser(userData);
    await createSalary(user.userId, userData.salaryAmount);
    const role = await Role.findOne({ where: { roleId: user.roleId } });
    if (role.roleName === "employee") {
      await handleEmployeeRegistration(user, userData.fullname, userData.email);
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkPasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};

const getUserFromToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { userId: decoded.userId } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const checkTokenValidity = (user, token) => {
  if (user.token !== token) {
    throw new Error("Invalid or expired token");
  }
};

const updatePassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await User.update(
    { password: hashedPassword, token: null },
    { where: { userId } }
  );
};

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    try {
      checkPasswordsMatch(password, confirmPassword);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    let user;
    try {
      user = await getUserFromToken(token);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
    try {
      checkTokenValidity(user, token);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    await updatePassword(user.userId, password);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setSalary = async (req, res) => {
  const { userId } = req.params;
  const { salaryAmount } = req.body;
  try {
    const salary = await Salary.findOne({ where: { userId } });
    if (salary) {
      await Salary.update({ amount: salaryAmount }, { where: { userId } });
    } else {
      await Salary.create({
        amount: salaryAmount,
        userId,
      });
    }
    res.status(200).json({ message: "Salary updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const keepLogin = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { userId: decoded.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  resetPassword,
  setSalary,
  keepLogin,
};
