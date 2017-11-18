import jwt from 'jsonwebtoken';

import getUserId from '../middleware/getUserId';
import { User, Level } from '../models';
import getUserToken from '../helpers/jwt';
import nullValidation from '../helpers/signupNullValidation';
import signupInputValidation from '../helpers/signupInputValidation';

export default {

  /** @description signs up a user
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} user details object
   */
  signup: (req, res) => {
    nullValidation(req.body);
    signupInputValidation(req.body);
    if (nullValidation(req.body).isValid
      && signupInputValidation(req.body).isValid) {
      const email = req.body.email;
      const password = req.body.password;
      const username = req.body.username;
      const levelId = req.body.levelId; User.findOne({
        where: {
          $or: [{
            username
          }, { email }]
        }
      }).then((foundUser) => {
        if (foundUser && foundUser !== null) {
          return res.status(422).json({
            message: 'Email already Exists, Please choose another one'
          });
        }
        User.create({
          email,
          username,
          password,
          levelId,
          profilepic: req.body.profilepic || null
        }).then((createdUser) => {
          createdUser.getLevel()
            .then((level) => {
              const token = getUserToken(createdUser);
              const user = {
                username: createdUser.username,
                levelId: createdUser.levelId,
                profilePic: createdUser.profilePic,
                email: createdUser.email,
                borrowCount: createdUser.borrowCount,
                admin: createdUser.admin,
                level: level.type,
                maxDays: level.maxDays,
                maxBooks: level.maxBooks
              };
              res.status(201).send({ message: 'Welcome', user, token });
            })
            .catch((error) => {
              res.status(500).send(error.message);
            });
        })
          .catch((error) => {
            res.status(500).send(error.message);
          });
      })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    } else if (nullValidation(req.body).message) {
      res.status(400).send({ message: nullValidation(req.body).message });
    } else if (signupInputValidation(req.body).message) {
      res.status(422)
        .send({ message: signupInputValidation(req.body).message });
    }
  },
  /** @description displays user profile
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} user details
   */
  profile: (req, res) => {
    const userId = getUserId(req);
    User.findById(userId, {
      include: [{
        model: Level,
        as: 'level',
        attributes: ['type', 'maxBooks', 'maxDays'],
      }]
    })
      .then((user) => {
        if (user) {
          const userProfile = {
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            admin: user.admin,
            borrowCount: user.borrowCount,
            levelId: user.levelId,
            level: user.level.type,
            maxBooks: user.level.maxBooks,
            maxDays: user.level.maxDays
          };
          return res.status(200).send({ message: 'Success!', userProfile });
        }
        return res.status(404).json({
          message: 'User not found',
        });
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description updates a users image
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} user
   */
  changeImage(req, res) {
    const userId = getUserId(req);
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
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        user.update({
          profilePic
        });
        res.status(200).send({ message: 'Profile picture updated!', user });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
