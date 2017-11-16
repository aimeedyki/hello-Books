import jwt from 'jsonwebtoken';

const getUserId = (req) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  const userParams = jwt.decode(token);
  return userParams.userId;
};

export default getUserId;
