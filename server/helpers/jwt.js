import jwt from 'jsonwebtoken';

const token = user =>
  jwt.sign({
    userId: user.id,
    userRole: user.level,
  },process.env.secret, {
    expiresIn:'72h'
  });
export default token;