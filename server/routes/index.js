const usersController = require('../controllers').users;
const booksController = require('../controllers').books;
const historiesController = require('../controllers').histories;
const categoriesController = require('../controllers').categories;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Booksville!',
  }));
  
  //route for registration
  app.post('/api/v1/users/signup', usersController.create);
  //route for login
 app.post('/api/v1/users/signin', usersController.auth);
  //route for category
 app.post('/api/v1/category', categoriesController.create);
  //route for adding a book
  app.post('/api/v1/books', booksController.create );
  //route for modifying book information
  app.put('/api/v1/books/:id', booksController.modify);
  //displays allbooks in the library
  app.get('/api/v1/books', booksController.list);
  //borrows a book and saves to history of a user
  /*app.post('/api/v1/users/:userId/books', historiesController.create);
  //returns a book to the library by updating date returned
  app.put('/api/v1/users/:userId/books', historiesController.modify);
  //displays history
  app.get('/api/v1/users/:userId/books', historiesController.list);
 //display not returned
 app.get('/api/v1/users/:userId/books?returned=false', historiesController.returned)*/
};
