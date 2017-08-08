import usersController from '../controllers/users';
import booksController from '../controllers/books';
import historiesController from '../controllers/histories';
import categoriesController from '../controllers/categories';
import express from 'express';
const app = express();

app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to Booksville!',
}));
// route for registration
app.post('/api/v1/users/signup', usersController.produce);

// route for login
//app.post('/api/v1/users/signin', usersController.auth);
// route for creating a category
app.post('/api/v1/category', categoriesController.produce);

// route for displaying all categories
app.get('/api/v1/category', categoriesController.list);

// route for adding a book
app.post('/api/v1/books', booksController.addBook );

// route for modifying book information
app.put('/api/v1/books/:id', booksController.modify);

// displays allbooks in the library
app.get('/api/v1/books', booksController.list);

// borrows a book and saves to history of a user
app.post('/api/v1/users/:userId/books', historiesController.borrow);

//returns a book to the library by updating date returned
app.put('/api/v1/users/:userId/books', historiesController.modify);

//displays history
app.get('/api/v1/users/:userId/books', historiesController.list);


export default app;
