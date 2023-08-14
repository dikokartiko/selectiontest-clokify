// seeders/20230813111923-demo-attendance.js
"use strict";

const getRandomDate = (year) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attendanceData = [];
    for (let i = 2; i <= 3; i++) {
      for (let j = 0; j < 10; j++) {
        const date = getRandomDate(2023);
        attendanceData.push({
          clockIn: "09:00:00",
          clockOut: "17:00:00",
          date: date.toISOString().split("T")[0],
          ontime: true,
          lateClockin: false,
          earlyClockOut: false,
          absent: false,
          userId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert("Attendances", attendanceData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
