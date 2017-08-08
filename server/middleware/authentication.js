import jwt from 'jsonwebtoken';


require('dotenv').config();

const authentication = {
  /**
     * verifyToken: This verifies all routes that starts with /api
     *  It checks if there is token and check if the token is valid
     *  if the token is valid, then it decodes it and send to the next route
     * @function verifyUser
     * @param {object} request sends a request to check if a token has been set on the header
     * @param {object} response gets a response if the request was successful or not.
     * @param {object} next response
     * @return {object}  returns response status and json data
     */
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
  }
};

export default authentication;