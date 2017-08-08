'use strict';
export default (sequelize, DataTypes)=> {
  const History = sequelize.define('History', {
    borrowedDate: DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    return: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        History.belongsTo(models.Book, {
          foreignKey: 'bookId',
        });
        History.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return History;
};