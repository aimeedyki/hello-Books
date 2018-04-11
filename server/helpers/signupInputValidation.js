/** @description validates email format
 *
 * @param {object} email a form object
 *
 * @returns {boolean} a boolean for if email is valid
 */
const validateEmail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

/** @description validates signup form for valid email and password fields
 *
 * @param {object} fields a form object
 * 
 * @returns {object} response object with a validation boolean and a message
 */
const signupInputValidation = (fields) => {
  const email = fields.email || null;
  const password = fields.password || null;
  if (password !== null) {
    if (password.length < 8) {
      return {
        message: 'Password must be up to 8 characters',
        isValid: false
      };
    }
  }
  if (email !== null) {
    if (!validateEmail(email)) {
      return {
        message: 'Please enter a valid email',
        isValid: false
      };
    }
    return { isValid: true };
  }
};

export default signupInputValidation;
