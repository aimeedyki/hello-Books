import {Book}from '../models';
import {History} from '../models';
//const Book = model.Book
export default {
  //user borrows a book and creates a history record
  borrow (req, res) {
    return Book.find({where:{id: req.body.bookId}})
      .then(Book => {
        if (!Book) {
          return res.status(404).send({error: 'Book does not exist'});
        }
        if (Book.quantity === 0) {
          return res.status(404).send({message: 'This book is out of stock! Please try again later.'});
        }
        History.create({
          borrowedDate: req.body.borrowedDate,
          returned: req.body.returned,
          userId: req.params.userId,
          bookId: req.body.bookId,
        },
        { returning: true,
          plain: true
        }) .then(History => res.status(200).send(History))
          .then(Book => {
            Book.update({
              quantity: (Book.quantity - 1),
            });
          })
          .then(History => res.status(200).send(History))
          .catch(error => res.status(400).send(error.message));
      });
  },

  // returns the book by updating the history with return date
  modify(req, res) {
    return Book.find({where:{id: req.body.bookId}})
      .then(
        History.update({
          returnDate: req.body.returnDate,
          return: req.body.returned,
        },
        {
          where: {userId: req.params.userId, bookId: req.body.bookId},
        })
      ) .then(History => res.status(200).send(History))
      .then(Book => {
        Book.update({
          quantity: (Book.quantity + 1),
        },{where: {id: req.body.bookId}});
      })
      .then(History => res.status(200).send(History))
      .catch(error => res.status(400).send(error.message));
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