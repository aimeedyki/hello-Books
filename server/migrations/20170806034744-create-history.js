'use strict';
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
      return: {
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
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      username: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'username',
          as: 'username',
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'books',
          key: 'id',
          as: 'bookId',
        },
      },
      title: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'books',
          key: 'title',
          as: 'bookTitle',
        },
      },
    });
  },
  down: (queryInterface, Sequelize)=> {
    return queryInterface.dropTable('Histories');
  }
};