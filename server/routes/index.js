import express from 'express';
import usersController from '../controllers/users';
import booksController from '../controllers/books';
import historiesController from '../controllers/histories';
import categoriesController from '../controllers/categories';
import authController from '../controllers/auth';
import authentication from '../middleware/authentication';
import notificationsController from '../controllers/notifications';

const app = express();

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       email:
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
 *   displayId:
 *     properties:
 *       id:
 *         type: integer
 *       x-access-token:
 *         type: string
 */

/**
* @swagger
* definition:
*   display:
*     properties:
*       x-access-token:
*         type: string
*/

/**
 * @swagger
 * definition:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       image:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       categoryId:
 *         type: integer
 *       x-access-token:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   updateBook:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       image:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       categoryId:
 *         type: integer
 *       bookId:
 *         type: integer
 *       x-access-token:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   borrow:
 *     properties:
 *       bookId:
 *         type: integer
 *       userId:
 *         type: integer
 *       x-access-token:
 *         type: string
 */

/**
* @swagger
* definition:
*   history:
*     properties:
*       userId:
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
 *       - name: email
 *         description: users' email
 *         in: body
 *         required: true
 *       - name: username
 *         description: users' username
 *         in: body
 *         required: true
 *       - name: levelId
 *         description: input either 1,2, or 3
 *         in: body
 *         required: true
 *       - name: password
 *         description: users' password. should be up to 8 characters
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Successfully created
 */

// route for registration
app.post('/users/signup', usersController.signup);

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
app.post('/users/signin', authController.login);

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
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Change'
 *     responses:
 *       200:
 *         description: Password updated!!
 */

// route to change password
app.put('/user/password',
  authentication.verifyUser, authController.changePassword);

// route to change level
app.put(
  '/user/level',
  authentication.verifyUser, authController.changeLevel
);

// route to change profile picture
app.put(
  '/user/profile-image',
  authentication.verifyUser, usersController.changeImage
);
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
 *           $ref: '#/definitions/displayId'
 *     responses:
 *       200:
 *         description: Profile displayed
 */

// route to display user profile
app.get(
  '/user/profile',
  authentication.verifyUser, usersController.profile
);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Books
 *     description: creates a book category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Category
 *         description: category title
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/category'
 *     responses:
 *       200:
 *         description: Category created
 */

// route for creating a category
app.post(
  '/category', authentication.verifyUser,
  authentication.verifyAdmin, categoriesController.addCategory
);

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Books
 *     description: displays all categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: token
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/display'
 *     responses:
 *       200:
 *         description: Available categories are displayed
 */
// route for displaying all categories
app.get(
  '/category', authentication.verifyUser,
  categoriesController.listCategories
);


/**
 * @swagger
 * /category/:id:
 *   get:
 *     tags:
 *       - Books
 *     description: displays all books in a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Category
 *         description: category Id
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/displayId'
 *     responses:
 *       200:
 *         description: Available books in this are displayed
 */
// route for displaying all the books by categories
app.get(
  '/:id/category/', authentication.verifyUser,
  categoriesController.displayCategory
);

// route for modifying category
app.put(
  '/:id/category/', authentication.verifyUser,
  categoriesController.editCategory
);

// route for deleting a category
app.delete(
  '/:id/category/', authentication.verifyUser,
  categoriesController.deleteCategory
);
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     description: Creates a new book and can only be accessed by admin users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       201:
 *         description: Successfully created
 */

// route for adding a book
app.post(
  '/books', authentication.verifyUser,
  authentication.verifyAdmin, booksController.addBook
);

/**
 * @swagger
 * /books/:id:
 *   put:
 *     tags:
 *       - Books
 *     description: Updates a book and can only be accessed by admin users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateBook'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

// route for modifying book information
app.put(
  '/books/:id', authentication.verifyUser,
  authentication.verifyAdmin, booksController.modifyBook
);

/**
 * @swagger
 * /books/:id:
 *   delete:
 *     tags:
 *       - Books
 *     description: deletes a book and can only be accessed by admin users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Book
 *         description: Book id
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/displayId'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

// route for deleting a book
app.delete(
  '/books/:id', authentication.verifyUser,
  authentication.verifyAdmin, booksController.deleteBook
);

// route for getting a books detail
app.get(
  '/books/:id',
  authentication.verifyUser, booksController.viewBook
);

// route for getting a books detail
app.get(
  '/search',
  authentication.verifyUser, booksController.searchBooks
);
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     description: displays all books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: token
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/display'
 *     responses:
 *       200:
 *         description: Available books are displayed
 */
// displays allbooks in the library
app.get('/books/', authentication.verifyUser, booksController.listBooks);

/**
 * @swagger
 * /users/:userId/books:
 *   post:
 *     tags:
 *       - Borrow
 *     description: borrows a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Book
 *         description: book details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/borrow'
 *     responses:
 *       201:
 *         description: book borrowed
 */

// borrows a book and saves to history of a user
app.post('/user/borrow-book',
  authentication.verifyUser, historiesController.borrow);

/**
 * @swagger
 * /users/:userId/books:
 *   put:
 *     tags:
 *       - Borrow
 *     description: returns a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Book
 *         description: book details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/borrow'
 *     responses:
 *       200:
 *         description: book returned
 */
// returns a book to the library
app.put(
  '/user/return-book',
  authentication.verifyUser, historiesController.returnBook
);

/**
 * @swagger
 * /users/:userId/books:
 *   get:
 *     tags:
 *       - Borrow
 *     description: displays a user's borrow history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: borrow details
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/history'
 *     responses:
 *       200:
 *         description: book returned
 */
// displays history
app.get(
  '/user/books',
  authentication.verifyUser, historiesController.displayHistory
);

/**
* @swagger
* /users/:userId/books?returned=false:
*   get:
*     tags:
*       - Notifications
*     description: displays the notifications on user activities to admin
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: token
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/display'
*     responses:
*       200:
*         description: notifications displayed
*/
// displays notifications
app.get(
  '/notifications', authentication.verifyUser,
  authentication.verifyAdmin, notificationsController.displayNotification
);

export default app;
