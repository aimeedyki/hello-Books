/* eslint-disable */
const bcrypt = require('bcrypt');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
        {
            email: 'amarachi@gmail.com',
            firstname: 'Amarachi',
            lastname: 'Akuwudike',
            username: 'aimeeamy',
            password: bcrypt.hashSync('bookiiii', 10),
            level: 'admin',
            profilepic: 'img0001.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),

        } ]);
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.bulkDelete('Users', [{
          username :'aimeeamy'
      }])
  }
  };
