import jwt from 'jsonwebtoken';
import { User } from '../models';
const secret = process.env.SECRET;
import getUserToken from '../helpers/jwt';

export default {
  // creates a user
  signup: (req, res) => {
    let maxVal = 0;
    if (req.body.level === 'rookie') {
      maxVal += 3;
    }
    if (req.body.level === 'bookworm') {
      maxVal += 5;
    }
    if (req.body.level === 'voracious') {
      maxVal += 10;
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

      .then(user => {
        const token = getUserToken(user);
        res.status(201).send({ user, token });
      })

      .catch(error => {
        return res.status(400).send(error.message);
      })
  },

  //displays user profile
  profile: (req, res) => {
    return User.findById(req.params.id)

      .then(user => { return res.status(200).send(user); })
      .catch(error => res.status(400).send(error));
  }
};
