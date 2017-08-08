import {User} from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
  login(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      }).then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
        }
        const passkey = bcrypt.compareSync(req.body.password, user.password);
        if (passkey) {
          const token = getUserToken(user);
          const oldUser = {
            success: true,
            userId: user.id,
            userEmail: user.email,
          };
          res.status(200).send({ oldUser, token });
        } else {
          res.status(401).send({ message: 'Password is incorrect' });
        }
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while authenticating user'
      }));
  }
};

export default authController;

