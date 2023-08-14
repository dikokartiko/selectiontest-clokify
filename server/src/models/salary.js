//models/salary.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Salary = sequelize.define('Salary', {
  salaryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Salary.belongsTo(User, { foreignKey: 'userId' });

module.exports = Salary;
