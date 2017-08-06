'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING,
    profilepic: DataTypes.STRING
  }, 
  //hashes password
  /*{  hooks: {
       beforeCreate: (user, fn) => {
         const salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
          return salt
         });
         bcrypt.hash(user.password, salt, null, (err, hash)=>{
             if(err) return next(err);
             user.password = hash;
             return fn(null, user);
         });
         /*user.password = bcrypt.hashSync(user.password, salt);*/
  /*    }
    },
    instanceMethods: {
        /*generateHash: (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },*/
    /*   validPassword: (password) =>{
            /*return bcrypt.compareSync(password, this.password);*/
     /*     bcrypt.compare(password, passwd, (err, issmatch)=>{
              if(err) console.log(err)
              if (isMatch){
                  return done(null,user)
              } else{
                return done(null, false)
              }
            });
          }
        },
    },*/
 {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.History, {
          foreignKey: 'userId',
          as: 'histories',
        });
      }
    }
  });
  return User;
};