
export default (sequelize, DataTypes) =>{
  const Book = sequelize.define('Book', {
    id:  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  })
  Book.associate= (models) => {
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Book.hasMany(models.History, {foreignKey: 'id'});
        //,{
    //   foreignKey: 'bookId',
    // });
  };

  return Book;
};