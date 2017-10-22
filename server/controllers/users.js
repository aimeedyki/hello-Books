import { User, Level } from '../models';
import getUserToken from '../helpers/jwt';
/* eslint-disable no-useless-escape */


const validateEmail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

export default {

  /** @description signs up a user
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} user details
   */
  signup: (req, res) => {
    const email = req.body.email || null;
    const password = req.body.password || null;
    const username = req.body.username || null;
    const levelId = req.body.levelId || null;

    if (email === null) {
      return res.status(400).send({
        message: 'Please enter your email'
      });
    }
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
    if (levelId === null) {
      return res.status(400).send({
        message: 'Please enter your level'
      });
    }
    if (password.length < 8) {
      return res.status(422).send({
        message: 'Password must be up to 8 characters'
      });
    }
    if (!validateEmail(email)) {
      return res.status(422).send({
        message: 'Please enter a valid email'
      });
    }
    User.findOne({
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
        profilepic: req.body.profilepic || null,
        borrowCount: 0,
        admin: false
      }).then((createdUser) => {
        const token = getUserToken(createdUser);
        res.status(201).send({ message: 'Welcome', token });
      })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  },
  /** @description displays user profile
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} user details
   */
  profile: (req, res) => {
    User.findById(req.params.id, {
      include: [{
        model: Level,
        as: 'level',
        attributes: ['type', 'maxBooks', 'maxDays'],
      }]
    })
      .then((user) => {
        if (user) {
          const token = getUserToken(user);
          return res.status(200).send({ token });
        }
        return res.status(404).json({
          message: 'User not found',
        });
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** @description displays user profile
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} user details
   */
  getLevel: (req, res) => {
    Level.findById(req.params.id)
      .then((level) => {
        if (level) {
          return res.status(200).send({ level });
        }
        return res.status(404).json({
          message: 'Level does not exist'
        });
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** @description updates a users image
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} user
   */
  changeImage(req, res) {
    const id = req.params.id;
    const profilepic = req.body.profilepic || null;

    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Please enter a valid user Id'
      });
    }
    if (profilepic === null) {
      return res.status(400).send({
        message: 'Please choose a profile pic'
      });
    }
    return User
      .findOne({
        where: {
          id
        }
      }).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        user.update({
          profilepic
        });
        res.status(200).send({ user });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
