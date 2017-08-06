'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>{
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        targetKey: true,
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id',
          as: 'categoryId',
        },
      },
       category: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'category',
          as: 'category',
        },
      },
    });
  },
  down: (queryInterface, Sequelize)=> {
    return queryInterface.dropTable('Books');
  }
};