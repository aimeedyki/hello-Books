import {Book}from '../models';
import {History} from '../models';
import {Notification} from '../models';
import {User} from '../models';
//const Book = model.Book
export default {
  // user borrows a book and creates a history record
  borrow (req, res) {
    return Book.find({where:{id: req.body.bookId}})
      .then(Book => {
        if (!Book) {
          return res.status(404).send({error: 'Book does not exist'});
        }
        if (Book.quantity === 0) {
          return res.status(404).send({message: 'This book is out of stock! Please try again later.'});
        }
        User.find({where: {id: req.params.userId}})
          .then(user => {
            if (User.borrowCount === User.max) {
              return res.status(400).send({message: 'You have reached the maixmum number of books you can borrow'});
            }
            User.update({
              borrowCount: User.borrowCount+=1,
            }, {where: {id: req.params.userId}})
            History.create({
              expectedDate: new Date(Date.now() + (User.max * 24 * 60 * 60 * 1000)),
              returned: false,
              userId: req.params.userId,
              bookId: req.body.bookId,
            },
            {
              returning: true,
              plain: true
            })
              .then(history => {
                Book.update({
                  quantity: (Book.quantity - 1),
                },
                {where: {id: req.body.bookId}})
                  .then(book => {
                    Notification.create({
                      userId: req.params.userId,
                      bookId: req.body.bookId,
                      action: 'Borrowed',
                    })
                      .then(notification => res.status(201).send(history));
                  });
              })
              .catch(error => res.status(400).send(error.message));
          });
      });
  },

  // returns the book by updating the history with return date
  modify(req, res) {
    return Book.find({where:{id: req.body.bookId}})
      .then(Book => {
        History.update({
          returnDate: req.body.returnDate,
          returned: true,
        },
        {
          where: {userId: req.params.userId, bookId: req.body.bookId},
        })
          .then(history => {
            Book.update({
              quantity: (Book.quantity + 1),
            }, {where: {id: req.body.bookId}})
              .then(book => {
                Notification.create({
                  userId: req.params.userId,
                  bookId: req.body.bookId,
                  action: 'Returned',
                })
                  .then(notification => res.status(200).send({message: 'book has been returned'}));
              });
          })
          .catch(error => res.status(400).send(error.message));
      });
  },


  // displays user history
  list(req, res) {
    const whereClause = {userId: req.params.userId}
    if(req.query.returned === 'false'){
      whereClause.returned = false;
    }
    return History
      .findAll({ where: whereClause})

      .then(histories => res.status(200).send(histories))
      .catch(error => res.status(400).send(error));
  },

};