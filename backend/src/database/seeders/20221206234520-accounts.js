"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "accounts",
      [
        {
          account_number: 11111,
          amount: 11000.00,
          user_id: 1
        },
        {
          account_number: 22222,
          amount: 22000.00,
          user_id: 2
        },
        {
          account_number: 33333,
          amount: 500.00,
          user_id: 3
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("accounts", null, {}),
};