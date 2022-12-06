module.exports = (sequelize, DataTypes) => {
  const TransferHistory = sequelize.define(
    "TransferHistory",
    {
      operation: DataTypes.STRING(10),
      amount: DataTypes.DECIMAL(9, 2),
    },
    {
      timestamps: false,
      tableName: "transfersHistory",
      underscored: true,
    }
  );

  TransferHistory.associate = (models) => {
    models.Sale.belongsToMany(models.User, {
      as: "senderAccount",
      through: TransferHistory,
      foreignKey: "senderAccount",
    });
    models.Product.belongsToMany(models.User, {
      as: "receiverAccount",
      through: TransferHistory,
      foreignKey: "receiverAccount",
    });
  };

  return TransferHistory;
};