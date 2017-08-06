const user = require('../models').User;
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

module.exports = {
  //creates a user 
  create(req, res) {
     return user
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
      .catch(error => res.status(400).send(error)); 
  },
  //authenticates login
  auth(req, res, next){
    return user
    .findOne({where:{ username: req.body.username}}, (error, user)=>{
      if(error) throw error;
      if(!user){
        res.json({success:false, message: "Authentification failed. User does not exist"});
      } else if (user){
          if(user.password != req.body.password){
            res.json({success:false, message: "Authentification failed. password is incorrect"})
          } else {
                const token = jwt.sign(user, app.get('superSecret'), {
                  expiresInMinutes: 1440
                });
                res.json({success: true,
                    message: "Enjoy your token!",
                    token: token

                });
          }
      }
    });
     /*.then((user)=>{

            if(user.validPassword(req.body.password)){
              res.send(user);
            } 
            else {
              res.send("password or email is incorrect");
            }
          })
     
    .catch(error => console.log(error.message)); */
  },

};
