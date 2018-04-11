
/** @description validate password change form
 *
 * @param {object} fields password form object
 *
 * @returns {object} response object with a validation boolean and a message
 */
const validatePassword = (fields) => {
  const oldPassword = fields.oldPassword || null;
  const newPassword = fields.newPassword || null;
  const confirmNewPassword = fields.confirmNewPassword || null;
  if (oldPassword === null) {
    return {
      message: 'Please enter your current password',
      isValid: false
    };
  }
  if (newPassword === null) {
    return {
      message: 'Please enter your new password',
      isValid: false
    };
  }
  if (confirmNewPassword === null) {
    return {
      message: 'Please confirm your new password',
      isValid: false
    };
  }
  if (confirmNewPassword !== newPassword) {
    return {
      message: 'Passwords do not match',
      isValid: false
    };
  }
  return { isValid: true };
};

export default validatePassword;
