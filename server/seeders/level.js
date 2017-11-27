
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Levels', [
      {
        type: 'rookie',
        maxBooks: 2,
        maxDays: 3,
        subscription: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'bookworm',
        maxBooks: 5,
        maxDays: 5,
        subscription: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'voracious',
        maxBooks: 10,
        maxDays: 7,
        subscription: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]),

  // down: queryInterface =>
  //   queryInterface.bulkDelete('Levels', null, {})
};
