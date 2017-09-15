import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getUserToken from '../helpers/jwt';
import {User} from '../models';

// Authorizes a User log in with token
const authController = {
  login(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      }).then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Username does not exist. Please confirm username or sign up with us.' });
        }

        // compares password received to stored hash password
        const passkey = bcrypt.compareSync(req.body.password, user.password);
        if (passkey) {
          const token = getUserToken(user);
          const userDetails = {
            username: user.username,
            email: user.email,
            level: user.level,
            userId: user.id
            };
          res.status(200).send({ userDetails, token });
        } else {
          res.status(401).send({ message: 'Password is incorrect' });
        }
      })
      .catch(error => res.status(400).send(error.message));
  },

  change(req, res){
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
        if (passkey) {
          const pass = bcrypt.hashSync(req.body.newPassword, 10);
          User.update({
            password: pass
          },{where:{id: req.params.id}});
          res.status(200).send({ user });
        } else {
          res.status(401).send({ message: 'Passwords do not match please use the forgot password option' });
        }
      })
      .catch(error => res.status(400).send(error.message));
  }
};

export default authController;

