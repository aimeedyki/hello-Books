'use strict';
module.exports = (sequelize, DataTypes)=> {
  const History = sequelize.define('History', {
    borrowedDate: DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    return: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        History.belongsTo(models.Book, {
          foreignKey: 'bookId',
          targetKey: 'title',
          onDelete: 'CASCADE',
      });
      History.belongsTo(models.User, {
          foreignKey: 'userId',
          targetKey: 'username',
          onDelete: 'CASCADE',
      });
    }
    }
  });
  return History;
};