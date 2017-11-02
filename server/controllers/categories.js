import { Category, Book } from '../models';
import paginate from '../middleware/book';

export default {
  /** @description creates a category
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} category
   */
  addCategory(req, res) {
    const name = req.body.name || null;
    if (name === null) {
      return res.status(400).send({
        message: 'Please enter category'
      });
    }
    Category.findOne({
      where: {
        name
      }
    }).then((foundCategory) => {
      if (foundCategory) {
        return res.status(409).send({ message: 'Category already exists' });
      }
      Category.create({
        name
      })
        .then(categories => res.status(201)
          .send({ message: 'Categories added!', categories }))
        .catch(error => res.status(500).send(error));
    })
      .catch(error => res.status(500).send(error));
  },
  /** @description displays all categories
    * @param {any} req HTTP request object
    * @param {any} res HTTP response object
    * @returns {object} categories
    */
  list(req, res) {
    return Category
      .all()
      .then((categories) => {
        const allCategories = { message: 'success', categories };
        res.status(200).send(allCategories);
      })
      .catch(error => res.status(500).send(error));
  },
  /** @description displays categories with the books in them
    * @param {any} req HTTP request object
    * @param {any} res HTTP response object
    * @returns {object} books
    */
  display(req, res) {
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid category'
      });
    }
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    Book
      .findAndCountAll({
        where: {
          categoryId
        },
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name'],
        }],
        order: [['title', 'ASC']],
        limit,
        offset
      })
      .then((books) => {
        const categoryBooks = {
          message: 'Success!',
          books: books.rows,
          pagination: paginate(offset, limit, books)
        };
        res.status(200).send(categoryBooks);
      })
      .catch(error => res.status(500).send(error));
  }

};
