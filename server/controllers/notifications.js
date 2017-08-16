import {Notification} from '../models';

export default {
  // displays notifications
  list(req, res) {
    return Notification
      .all()
      .then(notifications => res.status(200).send(notifications))
      .catch(error => res.status(400).send(error.message));
  },

};