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

// verifies user token
app.use(authentication.verifyUser);

// displays allbooks in the library
app.get('/api/v1/books', booksController.list);

// borrows a book and saves to history of a user
app.post('/api/v1/users/:userId/books', historiesController.borrow);

//returns a book to the library by updating date returned
app.put('/api/v1/users/:userId/books', historiesController.modify);

//displays history
app.get('/api/v1/users/:userId/books', historiesController.list);

//displays the books user has not returned
app.get('/api/v1/users/:userId/books?returned=false', historiesController.list);


//verifies admin priviledges
app.use(authentication.verifyAdmin);

// route for creating a category
app.post('/api/v1/category', categoriesController.addCategory);

// route for displaying all categories
app.get('/api/v1/category', categoriesController.list);

// route for adding a book
app.post('/api/v1/books', booksController.addBook );

// route for modifying book information
app.put('/api/v1/books/:id', booksController.modify);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to booksville',
}));

export default app;
