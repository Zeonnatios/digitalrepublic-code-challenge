module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numberAccount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'number_account',
      },
      amount: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  },
};
