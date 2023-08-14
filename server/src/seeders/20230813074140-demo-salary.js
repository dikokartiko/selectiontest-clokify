"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("salaries", [
      {
        amount: 5000000,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 3000000,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        amount: 5000000,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salaries", null, {});
  },
};
