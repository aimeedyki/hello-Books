module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        targetKey: true,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      levelId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      profilePic: {
        type: Sequelize.STRING
      },
      admin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      borrowCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      googleId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      surcharge: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      outstandingSubscription: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface =>
    queryInterface.dropTable('Users')
};
