import {History} from '../models';
import {User} from '../models';
import {Book} from '../models';

export default {
  //user borrows a book and creates a history record
  borrow (req, res) {
    return Book.findById(req.body.bookId)
      .then(Book => {
        if (!Book) {
          return res.status(404).send({error: 'Book does not exist'});
        }
        if (Book.quantity === 0) {
          return res.status(200).send({message: 'This book is out of stock! Please try again later.'});
        }

        return History.findOne({
          where: {
            bookId: req.body.bookId
          }
        })
          .then((History) => {
            History.create({
              borrowedDate: req.body.borrowedDate,
              return: req.body.return,
              userId: req.params.userId,
              bookId: req.body.bookId,
            });
          })
          .then(Book => {
            Book.update({
              quantity: (Book.quantity - 1),
            });
          });
      })
      .then(History => res.status(201).send(History))
      .catch(error => res.status(400).send(error.message));
  },

  // returns the book by updating the history with return date
  modify(req, res) {
    History.update({
      returnDate: req.body.returnDate,
      return: req.body.returned,
    },
    { where: { userId: req.params.userId, bookId: req.body.bookId },
      returning: true,
      plain: true
    })
      .then(Book => {
        Book.update({
          quantity: (Book.quantity + 1),
        });
      })
      .then(History => res.status(200).send(History))
      .catch(error => res.status(400).send(error.message));
  },

  //displays user history
  list(req, res) {
      const whereClause = {userId: req.params.userId}
      if(req.query.return === 'false'){
          whereClause.return = false;
      }

    return History
      .all({ where: whereClause})

      .then(histories => res.status(200).send(histories))
      .catch(error => res.status(400).send(error.message));
  },

  // displays books not returned
  returned(req, res) {
    return history
      .all({ where: { userId: req.params.userId, return: req.query.return}})

      .then(histories => res.status(200).send(histories))
      .catch(error => res.status(400).send(error.message));
  },
};