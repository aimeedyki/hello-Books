import usersController from '../controllers/users';
import booksController from '../controllers/books';
import historiesController from '../controllers/histories';
import categoriesController from '../controllers/categories';
import authController from '../controllers/auth';
import authentication from '../middleware/authentication';
import notificationsController from '../controllers/notifications';
import express from 'express';
const app = express();

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to booksville',
}));

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       username:
 *         type: string 
 *       password:
 *         type: string
 *       level:
 *         type: string
 *       profilepic:
 *         type: string   
 */

/**
 * @swagger
 * definition:
 *   Login:
 *     properties:
 *       username:
 *         type: string 
 *       password:
 *         type: string   
 */ 

/**
 * @swagger
 * definition:
 *   Change:
 *     properties:
 *       oldPassword:
 *         type: string 
 *       newPassword:
 *         type: string  
 *       x-access-token:
 *         type: string
 */ 

/**
 * @swagger
 * definition:
 *   Profile:
 *     properties:
 *       id:
 *         type: integer  
 *       x-access-token:
 *         type: string
 */  

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Successfully created
 */  

// route for registration
app.post('/api/v1/users/signup', usersController.signup);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users
 *     description: Logs in a registered user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: User logged in
 */ 

// route for login
app.post('/api/v1/users/signin', authController.login);

/**
 * @swagger
 * /users/:id:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a logged in user's password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Change'
 *     responses:
 *       200:
 *         description: Password updated!!
 */ 

// route to change password
app.put('/api/v1/users/:id', authController.change);

/**
 * @swagger
 * /users/:id:
 *   get:
 *     tags:
 *       - Users
 *     description: displays a users profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User Id
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *     responses:
 *       200:
 *         description: Profile displayed
 */ 

//route to display user profile
app.get('/api/v1/users/:id/profile', authentication.verifyUser, usersController.profile);


// displays allbooks in the library
app.get('/api/v1/books', authentication.verifyUser, booksController.list);

// borrows a book and saves to history of a user
app.post('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.borrow);

//returns a book to the library by updating date returned
app.put('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.modify);

//displays history
app.get('/api/v1/users/:userId/books', authentication.verifyUser, historiesController.list);

//displays notifications
app.get('/api/v1/notifications', authentication.verifyUser, authentication.verifyAdmin, notificationsController.list);

//displays the books user has not returned
app.get('/api/v1/users/:userId/books?returned=false', authentication.verifyUser, historiesController.list);

// route for creating a category
app.post('/api/v1/category', authentication.verifyUser, authentication.verifyAdmin, categoriesController.addCategory);

// route for displaying all categories
app.get('/api/v1/category', authentication.verifyUser, authentication.verifyAdmin, categoriesController.list);

//route for displaying all the books by categories
app.get('/api/v1/category/:id', authentication.verifyUser, categoriesController.display);

// route for adding a book
app.post('/api/v1/books', authentication.verifyUser, authentication.verifyAdmin, booksController.addBook );

// route for modifying book information
app.put('/api/v1/books/:id', authentication.verifyUser, authentication.verifyAdmin, booksController.modify);

// route for deleting a book
app.delete('/api/v1/books/:id', authentication.verifyUser, authentication.verifyAdmin, booksController.remove);

//app.get('*', (req, res) => res.status(200).send({
//  message: 'Welcome to booksville',
//}));

export default app;
