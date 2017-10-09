import bcrypt from 'bcrypt';

import getUserToken from '../helpers/jwt';

import { User } from '../models';

// Authorizes a User log in with token
const authController = {
  /** logs in a user
    * @param {any} req
    * @param {any} res
    * @returns {*} object
    */
  login(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      }).then((user) => {
        if (!user) {
          return res.status(404)
            .send({ message: 'Username does not exist. Please confirm' });
        }
        // compares password received to stored hash password
        const passkey = bcrypt.compareSync(req.body.password, user.password);
        if (passkey) {
          const token = getUserToken(user);
          const userDetails = {
            username: user.username,
            email: user.email,
            level: user.level,
            userId: user.id,
            max: user.max,
            profilepic: user.profilepic
          };
          return res.status(200).send({ userDetails, token });
        }
        return res.status(422)
          .send({ message: 'username or password is incorrect' });
      })
      .catch(error =>
        res.status(500).send(error));
  },
  /**  changes user password
    * @param {any} req
    * @param {any} res
    * @returns {object} user
    */
  change(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
        }
      }).then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
        }
        // compares password received to stored hash password
        const passkey = bcrypt.compareSync(req.body.oldPassword, user.password);
        const compareNew = bcrypt.compareSync(req.body.newPassword,
          user.password);

        if (!passkey) {
          return res.status(401)
            .send({ message: 'Passwords do not match' });
        } else if (compareNew) {
          return res.status(422)
            .send({ message: 'You cannot use a previous password' });
        }
        const pass = bcrypt.hashSync(req.body.newPassword, 10);
        User.update({
          password: pass
        }, { where: { id: req.params.id } });
        res.status(200).send({ user });
      })
      .catch(error => res.status(400).send(error.message));
  },
  /** Changes a users level
     * @param {any} req
     * @param {any} res
     * @returns {object} user
     */
  changeLevel(req, res) {
    let maxVal;
    if (req.body.newLevel === 'rookie') {
      maxVal = 3;
    } else if (req.body.newLevel === 'bookworm') {
      maxVal = 5;
    } else if (req.body.newLevel === 'voracious') {
      maxVal = 10;
    }
    return User
      .findOne({
        where: {
          id: req.params.id
        }
      }).then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
        } else if (user.level === req.body.newLevel) {
          return res.status(422)
            .send({ message: 'You are already on this level' });
        } else {
          user.update({
            level: req.body.newLevel,
            max: maxVal
          }, { where: { id: req.params.id } });
          res.status(200).send({ user });
        }
      })
      .catch(error => res.status(500).send(error.message));
  }
};
export default authController;
