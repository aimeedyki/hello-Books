
export default (sequelize, DataTypes) =>{
  // defines attributes for book model
  const Book = sequelize.define('Book', {
    id:  { allownull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{ allowNull: {
      args: false,
      msg: 'Please enter book title',
    },
    unique: {
      args: true,
      msg: 'This Book already exists',
    },
    type: DataTypes.STRING
    },
    author: {
      allowNull: {
        args: false,
        msg: 'Please enter an author',
      },
      type: DataTypes.STRING
    },
    description: {
      allowNull: {
        args: false,
        msg: 'Please enter a description',
      },
      type: DataTypes.STRING
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: {
        args: false,
        msg: 'Please enter quantity',
      },
      type: DataTypes.INTEGER
    },
    categoryId: {allownull: false, type: DataTypes.INTEGER,},
  })

  // defines associations to category and history models
  Book.associate= (models) => {
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Book.hasMany(models.History, {foreignKey: 'id'});
  };

  return Book;
};