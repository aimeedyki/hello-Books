import jwt from 'jsonwebtoken';

import { User, Level } from '../models';
import getUserToken from '../helpers/getUserToken';
import signupNullValidation from '../helpers/signupNullValidation';
import signupInputValidation from '../helpers/signupInputValidation';

export default {

  /** @description signs up a user
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} user details
   * @returns {string} user jwt token
   */
  signup: (req, res) => {
    if (signupNullValidation(req.body).isValid
      && signupInputValidation(req.body).isValid) {
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;
      const name = req.body.name;
      User.findOne({
        where: {
          $or: [{
            username
          }, { email }]
        }
      }).then((foundUser) => {
        if (foundUser && foundUser !== null) {
          return res.status(409).json({
            message: 'Email/username already Exists, Please choose another one'
          });
        }
        User.create({
          email,
          username,
          name,
          password,
          googleId: req.body.googleId || null,
          profilePic: req.body.profilePic || null
        }).then((createdUser) => {
          createdUser.getLevel().then((level) => {
            const token = getUserToken(createdUser);
            const user = {
              name: createdUser.name,
              levelId: createdUser.levelId,
              profilePic: createdUser.profilePic,
              email: createdUser.email,
              borrowCount: createdUser.borrowCount,
              admin: createdUser.admin,
              surcharge: createdUser.surcharge,
              outstandingSubscription: createdUser.outstandingSubscription,
              level: level.type,
              maxDays: level.maxDays,
              maxBooks: level.maxBooks
            };
            res.status(201).send({ message: 'Welcome', user, token });
          }).catch((error) => {
            res.status(500).send(error.message);
          });
        }).catch((error) => {
          res.status(500).send(error.message);
        });
      }).catch((error) => {
        res.status(500).send(error.message);
      });
    } else if (signupNullValidation(req.body).message) {
      res.status(400).send({ message: signupNullValidation(req.body).message });
    } else if (signupInputValidation(req.body).message) {
      res.status(422)
        .send({ message: signupInputValidation(req.body).message });
    }
  },

  /** @description displays user profile
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} user details
   */
  displayProfile: (req, res) => {
    const userId = req.decoded.userId;
    User.findById(userId, {
      include: [{
        model: Level,
        as: 'level',
        attributes: ['type', 'maxBooks', 'maxDays'],
      }]
    })
      .then((user) => {
        const userProfile = {
          email: user.email,
          name: user.name,
          profilePic: user.profilePic,
          admin: user.admin,
          borrowCount: user.borrowCount,
          surcharge: user.surcharge,
          outstandingSubscription: user.outstandingSubscription,
          levelId: user.levelId,
          level: user.level.type,
          maxBooks: user.level.maxBooks,
          maxDays: user.level.maxDays
        };
        return res.status(200).send({ message: 'Success!', userProfile });
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description updates a users image
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} user details
   */
  changeImage(req, res) {
    const userId = req.decoded.userId;
    const profilePic = req.body.profilePic || null;
    if (profilePic === null) {
      return res.status(400).send({
        message: 'Please choose a profile pic'
      });
    }
    return User
      .findOne({
        where: {
          id: userId
        }
      }).then((user) => {
        user.update({
          profilePic
        });
        res.status(200).send({ message: 'Profile picture updated!', user });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
