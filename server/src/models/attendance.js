const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Schedule = require("./schedule");

const Attendance = sequelize.define("Attendance", {
  attendanceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clockIn: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  clockOut: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  ontime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  lateClockin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  earlyClockOut: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  absent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Attendance.belongsTo(User, { foreignKey: "userId" });
Attendance.belongsTo(Schedule, { foreignKey: "scheduleId" });

module.exports = Attendance;
