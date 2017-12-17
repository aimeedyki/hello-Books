/** @description calculates values for pagination
 *
 * @param {number} offset The offset from the first result to list from
 * @param {number} limit The maximum number of items to display
 * @param {object} books the book object
 *
 * @returns {object} pagination details
 */
const paginate = ((offset, limit, books) => {
  const pagination = {
    page: (Math.floor(offset / limit) + 1),
    pageCount: (Math.ceil(books.count / limit)),
    pageSize: books.rows.length,
    totalCount: books.count
  };
  return pagination;
});

export default paginate;
