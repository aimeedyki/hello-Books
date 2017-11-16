
/** @description validates signin form
   * @param {object} fields a form object
   * @returns {object} response object
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
