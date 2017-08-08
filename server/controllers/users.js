import {User} from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  // creates a user
  produce(req, res) {
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
          
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error.message)); 
  },

  //authenticates login
  auth(req, res){
    return User
      .findOne({where:{ username: req.body.username}}, (error, User)=>{
        if(error) throw error;
        if(!User){
          res.json({success:false, message: 'Authentification failed. User does not exist'});
        } else if (User){
          if(bcrypt.compareSync(req.body.password, this.password === false)){
            res.json({success:false, message: 'Authentification failed. password is incorrect'});
          } else {
            expiresInMinutes: 1440;
          }
          res.json({success: true,
            message: 'Enjoy your token!',
            token: token,
          });
        }
      });
  }


};
