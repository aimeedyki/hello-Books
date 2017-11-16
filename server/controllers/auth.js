import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import getUserToken from '../helpers/jwt';
import getUserId from '../middleware/getUserId';
import { User, Level } from '../models';
import signinValidation from '../helpers/signinValidation';
import validatePassword from '../helpers/validatePassword';

const authController = {

  /** @description Authorizes a User log in with token
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} user details object
    */
  login(req, res) {
    signinValidation(req.body);
    if (signinValidation(req.body).isValid) {
      const password = req.body.password;
      const username = req.body.username;
      User
        .findOne({
          where: {
            username
          },
          include: [{
            model: Level,
            as: 'level',
            attributes: ['type', 'maxBooks', 'maxDays'],
          }]
        }).then((foundUser) => {
          if (!foundUser) {
            return res.status(404)
              .send({ message: 'Username does not exist. Please confirm' });
          }
          // compares password received to stored hash password
          const passkey = bcrypt.compareSync(password, foundUser.password);
          if (passkey) {
            const token = getUserToken(foundUser);
            const user = {
              username: foundUser.username,
              profilepic: foundUser.profilepic,
              email: foundUser.email,
              borrowCount: foundUser.borrowCount,
              admin: foundUser.admin,
              level: foundUser.level.type,
              maxBooks: foundUser.level.maxBooks,
              maxDays: foundUser.level.maxDays
            };
            return res.status(200).send({ message: 'welcome', user, token });
          }
          return res.status(403)
            .send({ message: 'username or password is incorrect' });
        })
        .catch(error =>
          res.status(500).send(error));
    } else {
      res.status(400).send({ message: signinValidation(req.body).message });
    }
  },

  /**  changes user password
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} Message object
    */
  changePassword(req, res) {
    validatePassword(req.body);
    if (validatePassword(req.body).isValid) {
      const newPassword = req.body.newPassword;
      const userId = getUserId(req);
      User
        .findOne({
          where: {
            id: userId
          }
        }).then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'User not found' });
          }
          // checks if new password is the same with received to stored password
          const compareNew = bcrypt.compareSync(newPassword, user.password);
          if (compareNew) {
            return res.status(409)
              .send({ message: 'You cannot use a previous password' });
          }
          const pass = bcrypt.hashSync(newPassword, 10);
          user.update({
            password: pass
          });
          return res.status(200)
            .send({
              message: `hi ${user.username}, your password has been updated`
            });
        })
        .catch(error => res.status(500).send(error.message));
    }
    if (validatePassword(req.body).message) {
      res.status(400).send({ message: validatePassword(req.body).message });
    }
  },

  /** Changes a users level
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
     * @returns {object} response object
     */
  changeLevel(req, res) {
    const newLevelId = parseInt(req.body.newLevelId, 10);
    const userId = getUserId(req);
    if (isNaN(newLevelId)) {
      return res.status(400).send({
        message: 'Please enter new Level'
      });
    }
    User
      .findById(userId).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        if (newLevelId === user.levelId) {
          return res.status(409)
            .send({ message: 'You are already on this level' });
        }
        Level.findById(newLevelId)
          .then((level) => {
            if (!level) {
              return res.status(404).send({ message: 'Level does not exist' });
            }
            user.update({
              levelId: newLevelId
            });
            user.getLevel()
              .then((newLevel) => {
                const userDetails = {
                  username: user.username,
                  level: newLevel.type
                };
                res.status(200).send({ message: 'Level changed', userDetails });
              })
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  }
};
export default authController;
