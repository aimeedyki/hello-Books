'use strict';
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING,
    profilepic: DataTypes.STRING
  }, 
  
//hashes password
  {  hooks: {
       beforeCreate: (user) => {
         const salt = bcrypt.genSaltSync();
         user1.password = bcrypt.hashSync(user1.password, salt);
       }
     },
    instanceMethods: {
        generateHash: (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: (password) =>{
            return bcrypt.compareSync(password, this.password);
        },
    },
    
  }); 
 {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.History, {
          foreignKey: 'userId',
          as: 'histories',
        });
      }
    }
  };
  return User;
};