import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.SECRET;

/** @description starts method for surcharge
   *
   * @param { object } user user details
   *
   * @returns {*} null
   */
const getUserToken = user =>
  jwt.sign({
    userId: user.id,
    admin: user.admin
  }, secret, { expiresIn: '10h' });
export default getUserToken;
