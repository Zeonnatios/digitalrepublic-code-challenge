module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      numberAccount: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(9, 2),
      userId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'accounts',
      underscored: true,
    },
  );

  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Account;
};
