import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const authentication = {
  /** @description confirms a user's transaction
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {object} next 
   *
   * @returns {string} error message
   */
  verifyUser: (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        message: 'Not Authorized'
      });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      req.decoded = decoded;
      next();
    });
  },

  /** @description confirms a user's transaction
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @param {object} next
   *
   * @returns {string} error message
   */
  verifyAdmin: (req, res, next) => {
    if (req.decoded && req.decoded.admin === true) return next();
    return res.status(401).send({ message: 'you are not an admin' });
  }
};
export default authentication;
