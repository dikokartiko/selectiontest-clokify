"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Schedules", [
      {
        clockIn: "09:00",
        clockOut: "17:00",
        workday: "Monday",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clockIn: "09:00",
        clockOut: "17:00",
        workday: "Tuesday",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clockIn: "09:00",
        clockOut: "17:00",
        workday: "Wednesday",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clockIn: "09:00",
        clockOut: "17:00",
        workday: "Thursday",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clockIn: "09:00",
        clockOut: "17:00",
        workday: "Friday",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};
