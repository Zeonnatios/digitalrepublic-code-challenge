"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Matheus Antonio",
          cpf: "11122233310",
          email: "matheusantonio@email.com",
          password: "25d55ad283aa400af464c76d713c07ad"
          //12345678
        },
        {
          name: "Boris Williams",
          cpf: "11122233311",
          email: "boriswilliams@email.com",
          password: "25d55ad283aa400af464c76d713c07ad"
        },
        {
          name: "Stranger",
          cpf: "11122233312",
          email: "stranger@email.com",
          password: "25d55ad283aa400af464c76d713c07ad"
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};