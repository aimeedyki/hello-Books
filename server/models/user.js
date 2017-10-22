
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  // defines user attributes
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter an email',
      },
      unique: {
        args: true,
        msg: 'Email already exists, please log in or choose a new email',
      },
      validate: {
        isEmail: {
          msg: 'enter a valid email',
        },
      },
    },

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
            throw new Error('Username should be at least 3 characters');
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Please choose a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },

      },
    },
    levelId: {
      allownull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a level'
        },
      },
    },
    admin: DataTypes.BOOLEAN,
    profilepic: DataTypes.STRING,
    borrowCount: DataTypes.INTEGER,
  }, {
    hooks:
    {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  // defines user associations
  User.associate = (models) => {
    User.hasMany(models.History, {
      foreignKey: 'id',
      as: 'histories',
    });
    User.hasMany(models.Notification, {
      foreignKey: 'id',
      as: 'Notifications',
    });
    User.belongsTo(models.Level, {
      as: 'level',
      foreignKey: 'levelId',
    });
  };
  return User;
};
