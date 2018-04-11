export default (sequelize, DataTypes) => {
  // defines level attributes
  const Level = sequelize.define('Level', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxBooks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxDays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subscription: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  // defines user associations
  Level.associate = (models) => {
    Level.hasMany(models.User, {
      foreignKey: 'id',
      as: 'levels',
    });
    Level.hasMany(models.Subscription, {
      foreignKey: 'id',
      as: 'level',
    });
  };
  return Level;
};
