"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Attendances", {
      attendanceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clockIn: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      clockOut: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ontime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lateClockin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      earlyClockOut: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      absent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Schedules",
          key: "scheduleId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Attendances");
  },
};
