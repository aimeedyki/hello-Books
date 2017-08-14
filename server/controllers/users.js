import jwt from 'jsonwebtoken';
import {User} from '../models';
const secret = process.env.SECRET || 'princess';
import getUserToken from '../helpers/jwt';

export default {
  // creates a user
  signup: (req, res) =>{
    return User
      .create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        profilepic: req.body.profilepic,
      })

      .then(user => {
        const token = getUserToken(user);
        res.status(201).send({user, token});
      })

      .catch(error => res.status(400).send(error.message));
  },
  profile: (req, res)=> {
    return User.findById(req.params.id)

      .then(user => {return res.status(200).send(user);})
      .catch(error => res.status(400).send(error));
  }
};
