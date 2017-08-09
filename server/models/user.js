
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email:{ 
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter an email',
      },
      unique:{
        args: true,
        msg: 'Email already exists, please log in or choose a new email',
      },
      validate: {
        isEmail: {
          msg: 'enter a valid email',
        },
      },
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username',
      },
      unique: {
        args: true,
        msg: 'Username already exists! Please choose another username'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 3) {
            throw new Error('Username should be atleast 3 characters');
          }
        },
      },
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be atleast 8 characters');
          }
        },
      /*  notNull:{
          args: true,
          msg: 'Please choose a password'
        },*/
      },
    },
    level: DataTypes.STRING,
    profilepic: DataTypes.STRING,
  }, 
  
    // hashes password
  {  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  },
  });

  User.associate = (models) => {
    User.hasMany(models.History, {
      foreignKey: 'id',
      as: 'histories',
    });
  };
  return User;
};