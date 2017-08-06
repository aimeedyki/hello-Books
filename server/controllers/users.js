const user = require('../models').User;
const bcrypt = require('bcrypt');

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
      .catch(error => res.status(400).send(error.message)); 
  },
  //authenticates login
  auth(req, res, next){
    return user
    .findOne({ where: { username: req.body.username }})
     .then((user)=>{

            if(req.body.password === user.password){
              res.send(user);
            } 
            else {
              res.send("password or email is incorrect");
            }
          })
     
    .catch(error => console.log(error.message)); 
  },

};
