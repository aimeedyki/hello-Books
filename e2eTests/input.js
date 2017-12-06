const faker = require('faker');

module.exports = {
  input: {
    email: faker.internet.email(),
    userName: faker.internet.userName()
  }
};
