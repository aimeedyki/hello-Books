import { Subscription, Level, User } from '../models';
import paginate from '../middleware/book';

export default {
  confirmTransaction(req, res) {
    const transactionId = parseInt(req.body.transactionId, 10);
    if (isNaN(transactionId)) {
      return res.status(400).send({
        message: 'Please enter a valid subscripton Id'
      });
    }
    Subscription.findById(transactionId)
      .then((foundTransaction) => {
        if (!foundTransaction) {
          return res.status(404)
            .send({ message: 'Transaction does not exist' });
        }
        if (foundTransaction.confirmed) {
          return res.status(409)
            .send({
              message: 'Sorry this transaction has already been confirmed'
            });
        }
        User.findOne({ where: { username: foundTransaction.username } })
          .then((user) => {
            user.update({
              outstandingSubscription:
                user.outstandingSubscription - foundTransaction.amount,
              levelId: foundTransaction.levelId
            });
            foundTransaction.update({
              confirmed: true
            }).then(updatedSubcription => res.status(200)
              .send({ message: 'Transaction confirmed!', updatedSubcription }))
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  getTransactions(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    const whereClause = {};
    if (req.query.confirmed) {
      whereClause.confirmed = req.query.confirmed;
    }
    Subscription
      .findAndCountAll({
        include: [{
          model: Level,
          as: 'level',
          attributes: ['type']
        }],
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit,
        offset
      })
      .then((transactions) => {
        // if (books.rows.length < 1) {
        //   return res.status(200)
        //     .send({ message: 'Sorry, there are no books available' });
        // }
        const allTransactions = {
          transactions: transactions.rows,
          pagination: paginate(offset, limit, transactions)
        };
        res.status(200).send({ message: 'Success', allTransactions });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
