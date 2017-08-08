
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
      unique:{
        args: true,
        msg: 'Username already exists! Please choose another username'
      },
      validate: {
        len: {
          args: [3,10],
          msg: 'Username should be more than 2 characters and less than 10',
        },
      },
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3,10],
          msg: 'Password should be more than 2 characters and less than 10',
        },
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
    /*instanceMethods: {
        generateHash: (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: (password) =>{
            return bcrypt.compareSync(password, this.password);
        },
    },*/
    
  }); 

  User.associate = (models) => {
    User.hasMany(models.History, {
      foreignKey: 'userId',
      as: 'histories',
    });
  };
  return User;
};