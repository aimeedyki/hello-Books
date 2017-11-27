
/** @description validates level change form for null values
   * @param {object} fields a form object
   * @returns {object} response object
   */
const levelChangeValidation = (fields) => {
  const newLevelId = parseInt(fields.newLevelId, 10);
  const transactionId = fields.transactionId || null;
  const amount = fields.amount || null;
  if (isNaN(newLevelId)) {
    return {
      message: 'Please enter new Level',
      isValid: false
    };
  }
  if (transactionId === null) {
    return {
      message: 'Please enter your transaction reference number',
      isValid: false
    };
  }
  if (amount === null) {
    return {
      message: 'Please enter amount paid',
      isValid: false
    };
  }
  return { isValid: true };
};

export default levelChangeValidation;
