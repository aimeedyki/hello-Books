'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING,
    profilepic: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.History, {
          foreignKey: 'userId',
          as: 'histories',
        });
      }
    }
  });
  return User;
};