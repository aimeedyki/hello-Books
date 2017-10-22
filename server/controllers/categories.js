import { Category, Book } from '../models';

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
        .then(categories => res.status(201).send(categories))
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
        const allCategories = { categories };
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
    Category.findById(categoryId, {
      include: [{
        model: Book,
        as: 'books',
      }],
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({ message: 'Category does not exist' });
        }
        const bookCategory = { category };
        res.status(200).send(bookCategory);
      })
      .catch(error => res.status(500).send(error.message));
  },
};
