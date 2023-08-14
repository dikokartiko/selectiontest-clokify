//models/schedule.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Schedule = sequelize.define("Schedule", {
  scheduleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clockIn: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  clockOut: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  workday: {
    type: DataTypes.ENUM(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ),
    allowNull: false,
  },
});

Schedule.belongsTo(User, { foreignKey: "userId" });

module.exports = Schedule;
