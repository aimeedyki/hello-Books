import { User } from '../models';
import getUserToken from '../helpers/jwt';

// const secret = process.env.SECRET;

export default {

  signup: (req, res) => {
    let maxVal = 0;
    if (req.body.level === 'rookie') {
      maxVal += 3;
    } else if (req.body.level === 'bookworm') {
      maxVal += 5;
    } else if (req.body.level === 'voracious') {
      maxVal += 10;
    } else if (req.body.level === 'admin') {
      maxVal += 15;
    }

    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        profilepic: req.body.profilepic,
        max: maxVal,
        borrowCount: 0,
      })

      .then((user) => {
        const token = getUserToken(user);
        const userDetails = {
          username: user.username,
          email: user.email,
          level: user.level,
          userId: user.id,
          max: user.max,
          profilepic: user.profilepic
        };
        res.status(201).send({ userDetails, token });
      })

      .catch(error =>
        res.status(422).json({
          message: error.errors[0].message,
          errorField: error.errors[0].path
        })
      );
  },

  // displays user profile
  profile: (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        const userDetails = {
          username: user.username,
          email: user.email,
          level: user.level,
          userId: user.id,
          max: user.max,
          profilepic: user.profilepic
        };
        return res.status(200).send(userDetails);
      })
      .catch(error => res.status(400).send(error));
  },
  /** updates a users image
   * @param {any} req
   * @param {any} res
   * @returns {object} user
   */
  changeImage(req, res) {
    return User
      .findOne({
        where: {
          id: req.params.id
        }
      }).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        user.update({
          profilepic: req.body.profilepic
        }, { where: { id: req.params.id } });
        res.status(200).send({ user });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
