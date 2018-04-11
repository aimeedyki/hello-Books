
export default (sequelize, DataTypes) => {
  // Defines History attributes
  const History = sequelize.define('History', {
    expectedDate: DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    returned: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    userLevel: DataTypes.STRING,
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter bookId',
      },
    }
  });

  // Defines associations to book and user models
  History.associate = (models) => {
    History.belongsTo(models.Book, {
      as: 'book',
      foreignKey: 'bookId',
    });
    History.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return History;
};
