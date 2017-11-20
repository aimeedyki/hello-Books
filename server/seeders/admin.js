
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'aimee@yahoo.com',
        username: 'aimee',
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        levelId: 1,
        admin: true,
        borrowCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]),

  down: queryInterface =>
    queryInterface.bulkDelete('Users', [{
      username: 'aimee'
    }])
};
