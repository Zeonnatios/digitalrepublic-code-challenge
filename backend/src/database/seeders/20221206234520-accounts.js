"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "accounts",
      [
        {
          number_account: 11111,
          amount: 11000.00,
          user_id: 1
        },
        {
          number_account: 22222,
          amount: 22000.00,
          user_id: 2
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("accounts", null, {}),
};