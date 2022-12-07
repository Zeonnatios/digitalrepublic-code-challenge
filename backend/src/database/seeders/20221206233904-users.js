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
          password: "0ee0646c1c77d8131cc8f4ee65c7673b"
        },
        {
          name: "Boris Williams",
          cpf: "11122233311",
          email: "boriswilliams@email.com",
          password: "0ee0646c1c77d8131cc8f4ee65c7673b"
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};