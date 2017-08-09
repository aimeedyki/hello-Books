
export default  (sequelize, DataTypes) =>{
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  });
  Category.associate=(models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };
  return Category;
};