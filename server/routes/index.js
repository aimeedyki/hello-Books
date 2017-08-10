import usersController from '../controllers/users';
import booksController from '../controllers/books';
import historiesController from '../controllers/histories';
import categoriesController from '../controllers/categories';
import authController from '../controllers/auth';
import authentication from '../middleware/authentication';
import express from 'express';
const app = express();

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to booksville',
}));

// route for registration
app.post('/api/v1/users/signup', usersController.signup);

// route for login
app.post('/api/v1/users/signin', authController.login);

// displays allbooks in the library
app.get('/api/v1/books', authentication.verifyUser, booksController.list);

// borrows a book and saves to history of a user
app.post('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.borrow);

//returns a book to the library by updating date returned
app.put('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.modify);

//displays history
app.get('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.list);

//displays the books user has not returned
app.get('/api/v1/users/:userId/books?returned=false', authentication.verifyUser, historiesController.list);

// route for creating a category
app.post('/api/v1/category', authentication.verifyUser, authentication.verifyAdmin, categoriesController.addCategory);

// route for displaying all categories
app.get('/api/v1/category', authentication.verifyUser, authentication.verifyAdmin, categoriesController.list);

// route for adding a book
app.post('/api/v1/books', authentication.verifyUser, authentication.verifyAdmin, booksController.addBook );

// route for modifying book information
app.put('/api/v1/books/:id', authentication.verifyUser, authentication.verifyAdmin, booksController.modify);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to booksville',
}));

export default app;
