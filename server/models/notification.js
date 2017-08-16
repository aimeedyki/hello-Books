
export default (sequelize, DataTypes) => {
  //define notifications.js attributes
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    action: DataTypes.STRING
  });

  // Defines associations to book and user models
  Notification.associate= (models) => {
    Notification.belongsTo(models.Book, {
      as: 'book',
      foreignKey: 'bookId',
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Notification;
};