module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transferHistory', {
      senderAccount: {
        field: 'sender_account_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // primaryKey: true,
      },
      receiverAccount: {
        field: 'receiver_account_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        // primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('salesProducts');
  },
};
