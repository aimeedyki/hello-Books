import bcrypt from 'bcrypt';

import getUserToken from '../helpers/jwt';

import { User, Level } from '../models';

const authController = {
  /** @description Authorizes a User log in with token
    * @param {any} req HTTP request object
    * @param {any} res HTTP response object
    * @returns {*} object
    */
  login(req, res) {
    const password = req.body.password || null;
    const username = req.body.username || null;
    if (password === null) {
      return res.status(400).send({
        message: 'Please enter your password'
      });
    }
    if (username === null) {
      return res.status(400).send({
        message: 'Please enter your username'
      });
    }
    User
      .findOne({
        where: {
          username
        }
      }).then((foundUser) => {
        if (!foundUser) {
          return res.status(404)
            .send({ message: 'Username does not exist. Please confirm' });
        }
        // compares password received to stored hash password
        const passkey = bcrypt.compareSync(password, foundUser.password);
        if (passkey) {
          const token = getUserToken(foundUser);
          return res.status(200).send({ message: 'welcome', token });
        }
        return res.status(403)
          .send({ message: 'username or password is incorrect' });
      })
      .catch(error =>
        res.status(500).send(error));
  },
  /**  changes user password
    * @param {any} req HTTP request object
    * @param {any} res HTTP response object
    * @returns {object} Message
    */
  change(req, res) {
    const oldPassword = req.body.oldPassword || null;
    const newPassword = req.body.newPassword || null;
    if (oldPassword === null) {
      return res.status(400).send({
        message: 'Please enter your old password'
      });
    }
    if (newPassword === null) {
      return res.status(400).send({
        message: 'Please enter your new password'
      });
    }
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
        const passkey = bcrypt.compareSync(oldPassword, user.password);
        const compareNew = bcrypt.compareSync(newPassword, user.password);
        if (!passkey) {
          return res.status(401)
            .send({ message: 'Please reconfirm password' });
        } else if (compareNew) {
          return res.status(409)
            .send({ message: 'You cannot use a previous password' });
        }
        const pass = bcrypt.hashSync(req.body.newPassword, 10);
        User.update({
          password: pass
        }, { where: { id: req.params.id } });
        res.status(200).send({ message: 'password updated' });
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** Changes a users level
    * @param {any} req HTTP request object
    * @param {any} res HTTP response object
     * @returns {object} user details
     */
  changeLevel(req, res) {
    const levelId = parseInt(req.body.levelId, 10);
    if (isNaN(levelId)) {
      return res.status(400).send({
        message: 'Please enter new Level'
      });
    }
    User
      .findById(req.params.id).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        if (levelId === user.levelId) {
          return res.status(409)
            .send({ message: 'You are already on this level' });
        }
        Level.findById(levelId)
          .then((level) => {
            if (!level) {
              return res.status(404).send({ message: 'Level does not exist' });
            }
            user.update({
              levelId
            });
            const userDetails = {
              username: user.username,
              level: user.levelId
            };
            res.status(200).send({ userDetails });
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  }
};
export default authController;
