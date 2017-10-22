
const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'aimee@yahoo.com',
        username: 'aimee',
        password: bcrypt.hashSync('bookiiii', 10),
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
