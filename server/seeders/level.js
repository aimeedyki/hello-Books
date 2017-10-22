
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Levels', [
      {
        type: 'rookie',
        maxBooks: 2,
        maxDays: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'bookworm',
        maxBooks: 5,
        maxDays: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'voracious',
        maxBooks: 10,
        maxDays: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]),

  down: queryInterface =>
    queryInterface.bulkDelete('Levels', [{
      type: 'rookie'
    }, {
      type: 'bookworm'
    }, {
      type: 'voracious'
    }])
};
