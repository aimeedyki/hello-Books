
export default (sequelize, DataTypes) => {
  // defines attributes for subscription model
  const Subscription = sequelize.define('Subscription', {
    id: {
      allownull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transactionId: {
      allowNull: {
        args: false,
        msg: 'Please enter transaction reference',
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter transaction reference'
        },
      },
    },
    amount: {
      allowNull: {
        args: false,
        msg: 'Please enter amount paid',
      },
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter amount paid'
        },
      },
    },
    username: {
      type: DataTypes.STRING
    },
    levelId: {
      allownull: true,
      type: DataTypes.INTEGER
    },
    transactionType: {
      type: DataTypes.STRING
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
  // defines subscription associations
  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Level, {
      as: 'level',
      foreignKey: 'levelId',
    });
  };
  return Subscription;
};
