import express from 'express';
import usersController from '../controllers/users';
import booksController from '../controllers/books';
import historiesController from '../controllers/histories';
import categoriesController from '../controllers/categories';
import authController from '../controllers/auth';
import authentication from '../middleware/authentication';
import notificationsController from '../controllers/notifications';
import transactionsController from '../controllers/transaction';


const app = express();

/**
 * @swagger
 * definitions:
 *   Register:
 *     properties:
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       name:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ChangePassword:
 *     properties:
 *       oldPassword:
 *         type: string
 *       newPassword:
 *         type: string
 *       confirmNewPassword:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ChangeLevel:
 *     properties:
 *       newLevelId:
 *         type: number
 *       transactionId:
 *         type: string
 *       amount:
 *         type: number
 */

/**
 * @swagger
 * definitions:
 *   ChangeImage:
 *     properties:
 *       profilePic:
 *         type: number
 */

/**
 * @swagger
 * definitions:
 *   Profile:
 *     properties:
 *       user:
 *         type: object
 */

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       name:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   CategoryList:
 *     properties:
 *       categories:
 *         type: object
 */

/**
 * @swagger
 * definitions:
 *   DisplayCategory:
 *     properties:
 *       category:
 *         type: object
 */

/**
 * @swagger
 * definitions:
 *   EditCategory:
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   DeleteCategory:
 *     properties:
 *       id:
 *         type: number
 */

/**
 * @swagger
 * definitions:
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
 * definitions:
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
 */

/**
 * @swagger
 * definitions:
 *   deleteBook:
 *     properties:
 *       id:
 *         type: integer
 */

/**
 * @swagger
 * definitions:
 *   searchBook:
 *     properties:
 *       term:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   borrow:
 *     properties:
 *       bookId:
 *         type: integer
 */

/**
 * @swagger
 * definitions:
 *   notification:
 *     properties:
 *       notifications:
 *         type: object
 */

/**
 * @swagger
 * definitions:
 *   transaction:
 *     properties:
 *       transactId:
 *         type: integer
 *       transactType:
 *         type: string
 *       amount:
 *         type: integer
 */

/**
* @swagger
* definitions:
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
 *       - name: name
 *         description: user's name
 *         in: body
 *         required: true
 *       - name: password
 *         description: users' password. should be up to 8 characters
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Please fill in required parameters
 *       409:
 *         description: Email or username already Exists
 *       422:
 *         description: Please enter correct format for email or password
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
 *       - name: username
 *         description: User's username
 *         in: body
 *         required: true
 *       - name: password
 *         description: User's password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Please fill in required parameters
 *       403:
 *         description: Username or password is incorrect
 *       404:
 *         description: Username does not exist
 */

// route for login
app.post('/users/signin', authController.login);

/**
 * @swagger
 * /user/password:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a logged in user's password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: oldPassword
 *         description: user's current password
 *         in: body
 *         required: true
 *       - name: newPassword
 *         description: user's new password
 *         in: body
 *         required: true
 *       - name: confirmNewPassword
 *         description: confirm user's new password
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangePassword'
 *     responses:
 *       200:
 *         description: Password updated!!
 *       400:
 *         description: Please fill in required parameters
 *       409:
 *         description: You cannot use a previous password
 *       422:
 *         description: Please reconfirm password
 * 
 */

// route to change password
app.put('/user/password',
  authentication.verifyUser, authController.changePassword);

/**
 * @swagger
 * /user/level:
 *   put:
 *     tags:
 *       - Users
 *     description: Allows user to make a request to change membership
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: newLevelId
 *         description: new level a user want to change to either 1, 2 or 3
 *         in: body
 *         required: true
 *       - name: transactionId
 *         description: the reference number of payment
 *         in: body
 *         required: true
 *       - name: amount
 *         description: the amount paid to subscribe
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangeLevel'
 *     responses:
 *       202:
 *         description: request received
 *       400:
 *         description: Please fill in required parameters
 *       404:
 *         description: Level does not exist'
 *       409:
 *         description: You are already on this level
 */
// route to change level
app.put(
  '/user/level',
  authentication.verifyUser, authController.changeLevel
);

/**
 * @swagger
 * /user/profile-image:
 *   put:
 *     tags:
 *       - Users
 *     description: Allows user to make a request to change membership
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: profilePic
 *         description: new image url
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChangeImage'
 *     responses:
 *       200:
 *         description: picture changed
 *       400:
 *         description: Please enter image url
 */
// route to change profile picture
app.put(
  '/user/profile-image',
  authentication.verifyUser, usersController.changeImage
);
/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *       - Users
 *     description: displays a users profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Profile'
 *     responses:
 *       200:
 *         description: Success
 */

// route to display user profile
app.get(
  '/user/profile',
  authentication.verifyUser, usersController.displayProfile
);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     description: creates a book category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Category
 *         description: category title
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Category created
 *       400:
 *         description: Please enter category
 *       409:
 *         description: Category already exists
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
 *       - Category
 *     description: displays all categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CategoryList'
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
 * /:id/category:
 *   get:
 *     tags:
 *       - Category
 *     description: displays all books in a category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: category Id
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DisplayCategory'
 *     responses:
 *       200:
 *         description: Available books in this are displayed
 *       400:
 *         description: Please enter a valid category
 *       404:
 *         description: Category does not exist in this Library
 */
// route for displaying all the books by categories
app.get(
  '/:id/category/', authentication.verifyUser,
  categoriesController.displayCategory
);

/**
 * @swagger
 * /:id/category:
 *   put:
 *     tags:
 *       - Category
 *     description: edits a category name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: category Id
 *         in: path
 *         required: true
 *       - name: name
 *         description: category name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/EditCategory'
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Success! Category modified
 *       400:
 *         description: Please enter a valid category
 *       404:
 *         description: Category does not exist in this Library
 *       409:
 *         description: Category name already exists
 */
// route for modifying category
app.put(
  '/:id/category/', authentication.verifyUser,
  categoriesController.editCategory
);

/**
 * @swagger
 * /:id/category:
 *   delete:
 *     tags:
 *       - Category
 *     description: deletes a category 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: category Id
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DeleteCategory'
 *     responses:
 *       200:
 *         description: Success! Category modified
 *       400:
 *         description: Please enter a valid category
 *       404:
 *         description: Category does not exist in this Library
 *       409:
 *         description: Category has books in it
 */
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
 *       - name: title
 *         description: title of the book
 *         in: body
 *         required: true
 *       - name: author
 *         description: author of the book
 *         in: body
 *         required: true
 *       - name: description
 *         description: description of the book
 *         in: body
 *         required: true
 *       - name: quantity
 *         description: quantity of the book
 *         in: body
 *         required: true
 *       - name: categoryId
 *         description: category of the book
 *         in: body
 *         required: true
 *       - name: image
 *         description: picture of the book
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
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
 *       - name: title
 *         description: title of the book
 *         in: body
 *         required: false
 *       - name: author
 *         description: author of the book
 *         in: body
 *         required: false
 *       - name: description
 *         description: description of the book
 *         in: body
 *         required: false
 *       - name: quantity
 *         description: quantity of the book
 *         in: body
 *         required: false
 *       - name: categoryId
 *         description: category of the book
 *         in: body
 *         required: false
 *       - name: image
 *         description: picture of the book
 *         in: body
 *         required: false
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateBook'
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Book does not exist in this Library
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
 *       - name: id
 *         description: Book id
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/deleteBook'
 *     responses:
 *       200:
 *         description: Book has been deleted
 *       400:
 *         description: Please enter a valid bookId
 *       404:
 *         description: Please wait for all copies to come back to delete book
 *       409:
 *         description: Category has books in it
 */

// route for deleting a book
app.delete(
  '/books/:id', authentication.verifyUser,
  authentication.verifyAdmin, booksController.deleteBook
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
 *       - name: id
 *         description: Book id
 *         in: path
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/deleteBook'
 *     responses:
 *       200:
 *         description: Book has been deleted
 *       400:
 *         description: Please enter a valid bookId
 *       404:
 *         description: Book does not exist in this Library
 */
// route for getting a books detail
app.get(
  '/books/:id',
  authentication.verifyUser, booksController.viewBook
);

/**
 * @swagger
 * /books/:id:
 *   get:
 *     tags:
 *       - Books
 *     description: search for books in the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: term
 *         description: search term
 *         in: query
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/searchBook'
 *     responses:
 *       200:
 *         description: Book has been deleted
 *       400:
 *         description: Please enter your search term
 */
// route for searching for books
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
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
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
 *       - History
 *     description: borrows a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: Id of book to be borrowed
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/borrow'
 *     responses:
 *       201:
 *         description: book borrowed
 *       400:
 *         description: Please enter a valid bookId
 *       404:
 *         description: Book does not exist or is out of stock
 */

// borrows a book and saves to history of a user
app.post('/user/borrow-book',
  authentication.verifyUser, historiesController.borrow);

/**
 * @swagger
 * /user/return-book:
 *   put:
 *     tags:
 *       - History
 *     description: returns a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: historyId
 *         description: Id of the borrowed book record
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/borrow'
 *     responses:
 *       200:
 *         description: book returned
 *       400:
 *         description: Please enter a valid history Id
 *       404:
 *         description: This borrowed record does not exist
 *       409:
 *         description: This book has been returned
 */
// returns a book to the library
app.put(
  '/user/return-book',
  authentication.verifyUser, historiesController.returnBook
);

/**
 * @swagger
 * /user/books:
 *   get:
 *     tags:
 *       - History
 *     description: displays a user's borrow history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
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
* /notification:
*   get:
*     tags:
*       - Notifications
*     description: displays the notifications on user activities to admin
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: an authorization header
*         in: header
*         required: true
*         schema:
*           $ref: '#/definitions/notification'
*     responses:
*       200:
*         description: notifications displayed
*/
// displays notifications
app.get(
  '/notifications', authentication.verifyUser,
  authentication.verifyAdmin, notificationsController.displayNotification
);

/**
 * @swagger
 * /transaction:
 *   put:
 *     tags:
 *       - Transactions
 *     description: confirms a user transaction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: transactionId
 *         description: Id of book to be borrowed
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/transaction'
 *     responses:
 *       200:
 *         description: Transaction confirmed!
 *       400:
 *         description: Please enter a valid transactionId
 *       404:
 *         description: Transaction does not exist
 *       409:
 *         description: Sorry this transaction has already been confirmed
 */
// confirms subscription
app.put(
  '/transactions', authentication.verifyUser,
  authentication.verifyAdmin, transactionsController.confirmTransaction
);

/**
* @swagger
* /transaction:
*   get:
*     tags:
*       - Transactions
*     description: displays the notifications on user activities to admin
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: an authorization header
*         in: header
*         required: true
*         schema:
*           $ref: '#/definitions/transaction'
*     responses:
*       200:
*         description: Success! transaction 
*/
// displays subscription
app.get(
  '/transactions', authentication.verifyUser,
  authentication.verifyAdmin, transactionsController.getTransactions
);

/**
 * @swagger
 * /transaction:
 *   post:
 *     tags:
 *       - Transactions
 *     description: confirms a user transaction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: transactionId
 *         description: Id of book to be borrowed
 *         in: body
 *         required: true
 *       - name: transactionType
 *         description: Id of book to be borrowed
 *         in: body
 *         required: true
 *       - name: amount
 *         description: Id of book to be borrowed
 *         in: body
 *         required: true
 *       - name: Authorization
 *         description: an authorization header
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/transaction'
 *     responses:
 *       202:
 *         description: Transaction confirmed!
 *       400:
 *         description: Please make sure all fields are filled
 */
// add subscription
app.post(
  '/transactions', authentication.verifyUser,
  transactionsController.submitTransaction
);
export default app;
