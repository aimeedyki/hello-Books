
export default (sequelize, DataTypes) => {
  // defines attributes for book model
  const Book = sequelize.define('Book', {
    id: {
      allownull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      allowNull: {
        args: false,
        msg: 'Please enter book title',
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter book title'
        },
      },
    },
    author: {
      allowNull: {
        args: false,
        msg: 'Please enter an author',
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter an author'
        },
      },
    },
    description: {
      allowNull: {
        args: false,
        msg: 'Please enter a description',
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a description'
        },
      },
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,

    },
    quantity: {
      allowNull: {
        args: false,
        msg: 'Please enter quantity',
      },
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter quantity'
        },
      },
    },
    categoryId: { allownull: false, type: DataTypes.INTEGER, },
  }, { paranoid: true, });

  // defines associations to category and history models
  Book.associate = (models) => {
    Book.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    Book.hasMany(models.History, { foreignKey: 'id' });
    Book.hasMany(models.Notification, { foreignKey: 'id' });
  };

  return Book;
};
