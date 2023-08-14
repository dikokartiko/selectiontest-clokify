//models/payroll.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Payroll = sequelize.define("Payroll", {
  payrollId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  deductionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deductionTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Payroll.belongsTo(User, { foreignKey: "userId" });

module.exports = Payroll;
