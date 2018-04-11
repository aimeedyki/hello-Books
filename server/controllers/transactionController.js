import { Subscription, Level, User } from '../models';
import paginate from '../helpers/paginate';
import transactionValidation from '../helpers/transactionValidation';

export default {
  /** @description confirms a user's transaction
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} confirmed transaction details
   */
  confirmTransaction(req, res) {
    const transactionId = parseInt(req.body.transactionId, 10);
    let transactionUpdate;
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
            if (foundTransaction.transactionType === 'surcharge') {
              transactionUpdate = {
                surcharge: user.surcharge - foundTransaction.amount
              };
            }
            if (foundTransaction.transactionType === 'subscription') {
              transactionUpdate = {
                outstandingSubscription:
                  user.outstandingSubscription - foundTransaction.amount,
                levelId: foundTransaction.levelId
              };
            }
            user.update(transactionUpdate);
            foundTransaction.update({
              confirmed: true
            }).then(updatedSubcription => res.status(200)
              .send({
                message: 'Transaction confirmed!',
                updatedSubcription
              }))
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description displays all transactions
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {array} user transactions
   */
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
        const allTransactions = {
          transactions: transactions.rows,
          pagination: paginate(offset, limit, transactions)
        };
        res.status(200).send({ message: 'Success', allTransactions });
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description adds a transaction
   *
  * @param {object} req HTTP request object
  * @param {object} res HTTP response object
  *
  * @returns {object} submitted a transaction
  */
  submitTransaction(req, res) {
    if (transactionValidation(req.body).isValid) {
      const transactionId = req.body.transactionId;
      const transactionType = req.body.transactionType;
      const amount = parseInt(req.body.amount, 10);
      const userId = req.decoded.userId;
      User.findById(userId).then((user) => {
        Subscription.create({
          transactionId,
          transactionType,
          amount,
          levelId: user.levelId,
          username: user.username,
          confirmed: false
        }).then((transaction) => {
          res.status(202).send(transaction);
        })
          .catch(error => res.status(500).send(error.message));
      })
        .catch(error => res.status(500).send(error.message));
    }
    if (transactionValidation(req.body).message) {
      res.status(400)
        .send({ message: transactionValidation(req.body).message });
    }
  }
};
