module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('transferHistory',
      [
        {
          sender_account_id: 1,
          receiver_account_id: 2,
          amount: 500.00
        },
        {
          sender_account_id: 2,
          receiver_account_id: 1,
          amount: 700.00
        },

      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('transferHistory', null, {});
  },
};