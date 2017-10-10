import { Notification, Book, User } from '../models';

export default {
  // displays notifications
  list(req, res) {
    return Notification
      .findAll({
        include: [{
          model: Book,
          as: 'book',
          attributes: ['title'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        }
        ]
      })
      .then((notifications) => {
        const allNotifications = { notifications };
        res.status(200).send(allNotifications);
      })
      .catch(error => res.status(500).send(error.message));
  },

};
