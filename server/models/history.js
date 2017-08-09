
export default (sequelize, DataTypes)=> {
  const History = sequelize.define('History', {
    borrowedDate: DataTypes.DATE,
    returnedDate: DataTypes.DATE,
    returned: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
  })
  History.associate= (models) => {
    History.belongsTo(models.Book, {
        as: 'book',
      foreignKey: 'bookId',
    });
    History.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return History;
};