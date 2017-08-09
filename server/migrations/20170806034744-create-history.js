
module.exports = {
  up: (queryInterface, Sequelize)=> {
    return queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrowedDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      returnedDate: {
        type: Sequelize.DATE
      },
      returned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Books',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize)=> {
    return queryInterface.dropTable('Histories');
  }
};