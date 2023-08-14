"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Payrolls", [
      {
        deductionName: "lateClockin",
        deductionTotal: 10000,
        payday: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payrolls", null, {});
  },
};
