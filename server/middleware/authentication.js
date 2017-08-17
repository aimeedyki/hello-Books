import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || 'princess';


const authentication = {
  verifyUser: (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        message: 'Not Authorized'
      });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({message: 'Invalid token'});
      }
      req.decoded = decoded;
      next();
    });
  },

 verifyAdmin: (req, res, next) => {
   if(req.decoded && req.decoded.level ==='admin') return next();

     return res.status(401).send({ message: 'you are not an admin' });
   }
};
export default authentication;