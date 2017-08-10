import jwt from 'jsonwebtoken';


require('dotenv').config();

const authentication = {
  /*This verifies all routes that starts with /api
   It checks if there is token and check if the token is valid
   if the token is valid, then it decodes it and send to the next route*/

  verifyUser(request, response, next) {
    const token = request.headers['x-access-token'] || request.headers.authorization;
    if (!token) {
      return response.status(401).send({
        message: 'Not Authorized'
      });
    }
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return response.status(401).send({
          message: 'Invalid Token'
        });
      }
      request.decoded = decoded;
      next();
    });
  },

  verifyAdmin(request, response, next){
    if (request.decoded.user.level !== 'admin'){
      return response.status(401).send({message: 'Not Authorized'});
    } else{
      next();
    }
  }
};



export default authentication;