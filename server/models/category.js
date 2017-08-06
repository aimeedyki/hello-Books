'use strict';
module.exports = (sequelize, DataTypes) =>{
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Book, {
          foreignKey: 'categoryId',
          as: 'books',
        });
      }
    }
  });
  return Category;
};