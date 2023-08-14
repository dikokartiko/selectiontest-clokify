"use strict";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("@Qwerty123", SALT_ROUNDS);

    await queryInterface.bulkInsert("users", [
      {
        email: "rkodiko@gmail.com",
        password: hashedPassword,
        fullname: "dicco suryo kartiko",
        birthdate: new Date(1990, 0, 1),
        joinDate: new Date(),
        address: "123 Main St",
        phoneNumber: "555-1234",
        status: true,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "rkokartiko@gmail.com",
        password: hashedPassword,
        fullname: "superman",
        birthdate: new Date(1990, 0, 1),
        joinDate: new Date(),
        address: "123 Main St",
        phoneNumber: "555-1234",
        status: true,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "dikowebdev@gmail.com",
        password: hashedPassword,
        fullname: "risna wati",
        birthdate: new Date(1992, 2, 3),
        joinDate: new Date(),
        address: "456 Elm St",
        phoneNumber: "555-5678",
        status: true,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
