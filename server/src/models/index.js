//models/index.js
const User = require("./user");
const Role = require("./role");
const Payroll = require("./payroll");
const Schedule = require("./schedule");
const Attendance = require("./attendance");
const Salary = require("./salary");

const sequelize = require("../config/database");

module.exports = {
  sequelize,
  User,
  Role,
  Payroll,
  Schedule,
  Attendance,
  Salary,
};
