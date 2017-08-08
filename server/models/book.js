'use strict';
module.exports = (sequelize, DataTypes) =>{
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        Book.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          onDelete: 'CASCADE',
      });
    }
  }
  });
  return Book;
};