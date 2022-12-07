module.exports = (sequelize, DataTypes) => {
  const TransferHistory = sequelize.define(
    'TransferHistory',
    {
      amount: DataTypes.DECIMAL(9, 2),
    },
    {
      timestamps: false,
      tableName: 'transfersHistory',
      underscored: true,
    },
  );

  TransferHistory.associate = (models) => {
    models.User.belongsToMany(models.User, {
      as: 'senderAccount',
      through: TransferHistory,
      foreignKey: 'senderAccount',
    });
    models.User.belongsToMany(models.User, {
      as: 'receiverAccount',
      through: TransferHistory,
      foreignKey: 'receiverAccount',
    });
  };

  return TransferHistory;
};
