import { Book, History, Notification, User } from '../models';

export default {
  /**  user borrows a book and creates a history record
     * @param {any} req
     * @param {any} res
     * @returns {object} history
     */
  borrow(req, res) {
    return Book.find({ where: { id: req.body.bookId } })
      .then((book) => {
        console.log('the value of the book', book);
        if (!book) {
          return res.status(404).send({ error: 'Book does not exist' });
        }
        if (book.quantity <= 0) {
          console.log('i got here season finale');
          return res.status(404)
            .send({ message: 'This book is out of stock!' });
        }
        History.findOne({
          where: { userId: req.params.userId, bookId: req.body.bookId }
        })
          .then((history) => {
            console.log('history season 1', history);
            console.log('You got here season 1');
            if (history && history.returned === false) {
              console.log('You got here season 2');
              return res.status(403)
                .send({ message: 'You have borrowed this book already' });
            }
            User.find({ where: { id: req.params.userId } })
              .then((user) => {
                if (user.borrowCount === user.max) {
                  return res.status(400)
                    .send({ message: 'Please return a book to borrow again' });
                }
                User.update({
                  borrowCount: (user.borrowCount + 1),
                }, { where: { id: req.params.userId } });
                History.create({
                  expectedDate: new Date(Date.now() +
                    (user.max * 24 * 60 * 60 * 1000)),
                  returned: false,
                  userId: req.params.userId,
                  bookId: req.body.bookId,
                }, { returning: true, plain: true });
                Book.update({
                  quantity: (book.quantity - 1),
                }, { where: { id: req.body.bookId } });
                Notification.create({
                  userId: req.params.userId,
                  bookId: req.body.bookId,
                  action: 'Borrowed',
                });
                res.status(201).send(history);
              });
          });
      })
      .catch(error => res.status(400).send(error.message));
  },
  /** returns the book by updating the history with return date
     * @param {any} req
     * @param {any} res
     * @returns {object} book
     */
  modify(req, res) {
    const today = new Date();
    return History.find({ where: { id: req.body.historyId } })
      .then((history) => {
        History.update({
          returnedDate: today,
          returned: true,
        }, { where: { id: req.body.historyId } });
        Book.find({ where: { id: history.bookId } })
          .then((book) => {
            console.log('dryyyyy', book);
            Book.update({
              quantity: (book.quantity + 1),
            }, { where: { id: history.bookId } });
            User.find({ where: { id: req.params.userId } })
              .then((user) => {
                User.update({
                  borrowCount: (user.borrowCount - 1),
                }, { where: { id: req.params.userId } });
                Notification.create({
                  userId: req.params.userId,
                  bookId: history.bookId,
                  action: 'Returned',
                });
                res.status(200).send({ message: 'book has been returned' });
              });
          });
      })
      .catch(error => res.status(400).send(error.message));
  },
  /** displays user history
   * @param {any} req
   * @param {any} res
   * @returns {object} users' history
   */
  list(req, res) {
    const whereClause = { userId: req.params.userId };
    if (req.query.returned === 'false') {
      whereClause.returned = false;
    }
    return History
      .findAll({
        include: [{
          model: Book,
          as: 'book',
          attributes: ['title'],
        }],
        where: whereClause
      })
      .then((histories) => {
        const allHistories = { histories };
        res.status(200).send(allHistories);
      })
      .catch(error => res.status(400).send(error));
  },
};
