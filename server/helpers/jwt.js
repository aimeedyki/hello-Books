import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.SECRET;

// generates token


const token = user =>
  jwt.sign({
    userId: user.id,
    admin: user.admin,
    username: user.username,
    levelId: user.levelId,
    profilepic: user.profilepic,
    email: user.email,
    borrowCount: user.borrowCount
  }, secret, { expiresIn: '10h' });
export default token;
