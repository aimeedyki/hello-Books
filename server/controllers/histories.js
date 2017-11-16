import { Book, History, Notification, User, Level } from '../models';
import paginate from '../middleware/book';
import getUserId from '../middleware/getUserId';

export default {
  /**  user borrows a book and creates a history record
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @returns {object} borrow details
     */
  borrow(req, res) {
    const bookId = parseInt(req.body.bookId, 10);
    const userId = getUserId(req);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid book Id'
      });
    }
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'Book does not exist' });
        }
        if (book.quantity <= 0) {
          return res.status(404)
            .send({ message: 'This book is out of stock!' });
        }
        User.findById(userId, {
          include: [{
            model: Level,
            as: 'level',
            attributes: ['type', 'maxBooks', 'maxDays'],
          }]
        })
          .then((user) => {
            if (!user) {
              return res.status(404)
                .send({ message: 'Please register to borrow' });
            }
            if (user.borrowCount === user.level.maxBooks) {
              return res.status(400)
                .send({ message: 'Please return a book to borrow again' });
            }
            user.update({
              borrowCount: (user.borrowCount + 1)
            });
            const expectedDate = new Date(Date.now() +
              (user.level.maxDays * 24 * 60 * 60 * 1000));
            History.create({
              expectedDate,
              returned: false,
              userId,
              bookId,
              userLevel: user.level.type
            }).then((history) => {
              book.update({
                quantity: (book.quantity - 1)
              });
              Notification.create({
                userId,
                bookId,
                action: 'Borrowed',
              })
                .then((notification) => {
                  const borrowDetail = {
                    username: user.username,
                    book: book.title,
                    borrowedOn: history.createdAt,
                    expectedReturnDate: history.expectedDate,
                    userLevel: user.level.type
                  };
                  res.status(201).send({
                    message: 'Book borrowed!', borrowDetail
                  });
                })
                .catch(error => res.status(500).send(error.message));
            })
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** returns the book by updating the history with return date
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @returns {object} return details
     */
  returnBook(req, res) {
    const historyId = parseInt(req.body.historyId, 10);
    const userId = getUserId(req);
    const today = new Date();
    if (isNaN(historyId)) {
      return res.status(400).send({
        message: 'Please enter a valid history Id'
      });
    }
    History.findById(historyId)
      .then((history) => {
        if (!history) {
          return res.status(404)
            .send({ message: 'This borrowed record does not exist' });
        }
        if (history.returned === true) {
          return res.status(409)
            .send({ message: 'This book has been returned' });
        }
        history.update({
          returnedDate: today,
          returned: true,
        });
        Book.findById(history.bookId)
          .then((book) => {
            book.update({
              quantity: (book.quantity + 1)
            });
            User.findById(userId)
              .then((user) => {
                user.update({
                  borrowCount: (user.borrowCount - 1),
                });
                Notification.create({
                  userId,
                  bookId: history.bookId,
                  action: 'Returned',
                }).then((notification) => {
                  const returnDetail = {
                    username: user.username,
                    book: book.title,
                    returnedOn: history.updatedAt,
                    expectedReturnDate: history.expectedDate
                  };
                  res.status(200)
                    .send({ message: 'Book returned!', returnDetail });
                })
                  .catch(error => res.status(500).send(error.message));
              })
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** displays user history
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} users' history
   */
  displayHistory(req, res) {
    const whereClause = { userId: getUserId(req) };
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    if (req.query.returned === 'false') {
      whereClause.returned = false;
    }
    return History
      .findAndCountAll({
        include: [{
          model: Book,
          as: 'book',
          attributes: ['title'],
          paranoid: false
        }],
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        limit,
        offset
      })
      .then((histories) => {
        const allHistories = {
          message: 'Success!',
          histories: histories.rows,
          pagination: paginate(offset, limit, histories)
        };
        res.status(200).send(allHistories);
      })
      .catch(error => res.status(500).send(error));
  },
};
