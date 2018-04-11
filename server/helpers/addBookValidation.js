/** @description validates form for adding a book
   *
   * @param {object} fields a form object
   *
   * @returns {object} response object with a validation boolean and a message
   */
const addBookValidation = (fields) => {
  const title = fields.title || null;
  const author = fields.author || null;
  const description = fields.description || null;
  const quantity = parseInt(fields.quantity, 10);
  const categoryId = parseInt(fields.categoryId, 10);
  const image = fields.image || null;

  if (title === null) {
    return {
      message: 'Please enter book title',
      isValid: false
    };
  }
  if (author === null) {
    return {
      message: 'Please enter author',
      isValid: false
    };
  }
  if (description === null) {
    return {
      message: 'Please enter a description',
      isValid: false
    };
  }
  if (isNaN(quantity)) {
    return {
      message: 'Please enter a valid quantity',
      isValid: false
    };
  }
  if (isNaN(categoryId)) {
    return {
      message: 'Please enter category',
      isValid: false
    };
  }
  return { isValid: true };
};

export default addBookValidation;
