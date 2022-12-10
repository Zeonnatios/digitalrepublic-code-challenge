module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING(50),
      cpf: DataTypes.STRING(11),
      email: DataTypes.STRING(50),
      password: DataTypes.STRING(32),
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasOne(models.Account, {
      foreignKey: 'userId',
      as: 'account',
    });
  };

  return User;
};
