
/** @description validates signin form for null values in fields
 *
 * @param {object} fields a form object
 *
 * @returns {object} response object with a validation boolean and a message
 */
const signinNullValidation = (fields) => {
  const password = fields.password || null;
  const username = fields.username || null;
  if (password === null) {
    return {
      message: 'Please enter your password',
      isValid: false
    };
  }
  if (username === null) {
    return {
      message: 'Please enter your username',
      isValid: false
    };
  }
  return { isValid: true };
};

export default signinNullValidation;
