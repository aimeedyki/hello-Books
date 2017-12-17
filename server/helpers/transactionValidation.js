/** @description validates signup form for valid email and password fields
 *
 * @param {object} fields a form object
 *
 * @returns {object} response object with a validation boolean and a message
 */
const transactionValidation = (fields) => {
  const transactionId = fields.transactionId || null;
  const transactionType = fields.transactionType || null;
  const amount = parseInt(fields.amount, 10);
  const categoryId = parseInt(fields.categoryId, 10);

  if (transactionId === null) {
    return {
      message: 'Please enter transaction reference',
      isValid: false
    };
  }
  if (transactionType === null) {
    return {
      message: 'Please enter a transaction type',
      isValid: false
    };
  }
  if (isNaN(amount)) {
    return {
      message: 'Please enter a valid amount',
      isValid: false
    };
  }
  return { isValid: true };
};

export default transactionValidation;
