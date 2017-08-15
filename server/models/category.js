
export default  (sequelize, DataTypes) =>{
  // defines category attribute
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a category',
      },
    },
  });

  // defines associations for category
  Category.associate=(models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'books',
    });
  };
  return Category;
};