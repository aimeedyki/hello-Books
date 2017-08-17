import jwt from 'jsonwebtoken';

require('dotenv').config();
const secret = process.env.SECRET;

//generates token


const token = user =>
  jwt.sign({
    username: user.username,
    level: user.level,
  }, secret , {
    expiresIn:'10h'
  });
export default token;