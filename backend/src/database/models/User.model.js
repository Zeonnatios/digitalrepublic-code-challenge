module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING(100),
      cpf: DataTypes.STRING(9),
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasOne(models.Account, {
      foreignKey: "userId",
      as: "account",
    });
  };

  return User;
};
