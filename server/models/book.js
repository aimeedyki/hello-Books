
export default (sequelize, DataTypes) =>{
  const Book = sequelize.define('Book', {
    id:  { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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