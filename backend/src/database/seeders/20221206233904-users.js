"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Matheus Antonio",
          cpf: "11122233310",
        },
        {
          name: "Boris Williams",
          cpf: "11122233311",
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};