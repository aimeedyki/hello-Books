/* eslint-disable no-useless-escape */
/** @description validates email format
   * @param {object} email a form object
   * @returns {boolean} a boolean for validated email
   */
const validateEmail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    return true;
  }
  return false;
};

/** @description validates signup form for valid email and password fields
   * @param {object} fields a form object
   * @returns {object} response object
   */
const signupInputValidation = (fields) => {
  if (fields.password.length < 8) {
    return {
      message: 'Password must be up to 8 characters',
      isValid: false
    };
  }
  if (!validateEmail(fields.email)) {
    return {
      message: 'Please enter a valid email',
      isValid: false
    };
  }
  return { isValid: true };
};

export default signupInputValidation;
