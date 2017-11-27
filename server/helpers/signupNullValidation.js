
/** @description validates signup form for null values
   * @param {object} fields a form object
   * @returns {object} response object
   */
const nullValidation = (fields) => {
  const email = fields.email || null;
  const password = fields.password || null;
  const username = fields.username || null;
  const name = fields.name || null;
  const levelId = fields.levelId || null;

  if (email === null) {
    return {
      message: 'Please enter your email',
      isValid: false
    };
  }
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
  if (name === null) {
    return {
      message: 'Please enter your name',
      isValid: false
    };
  }
  return { isValid: true };
};

export default nullValidation;
