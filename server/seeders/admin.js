
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'aimee@yahoo.com',
        username: 'aimee',
        name: 'aimee',
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        levelId: 1,
        admin: true,
        borrowCount: 0,
        surcharge: 0,
        outstandingSubscription: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]),

};
