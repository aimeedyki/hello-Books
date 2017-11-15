import { Category, Book } from '../models';
import paginate from '../middleware/book';

export default {
  /** @description creates a category
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} created category
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
          .send({ message: 'Category added!', categories }))
        .catch(error => res.status(500).send(error));
    })
      .catch(error => res.status(500).send(error));
  },

  /** @description displays all categories
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} categories
    */
  listCategories(req, res) {
    return Category
      .all()
      .then((categories) => {
        if (Object.keys(categories).length < 1) {
          return res.status(200)
            .send({ message: 'sorry there are no categories available' });
        }
        const allCategories = { message: 'success', categories };
        res.status(200).send(allCategories);
      })
      .catch(error => res.status(500).send(error));
  },

  /** @description displays categories with the books in them
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} books
    */
  displayCategory(req, res) {
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid category'
      });
    }
    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404)
            .send({ message: 'Category does not exist in this Library' });
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
            if (books.rows.length < 1) {
              return res.status(200)
                .send({ message: 'Sorry there are no books in this category' });
            }
            const categoryBooks = {
              message: 'Success!',
              books: books.rows,
              pagination: paginate(offset, limit, books)
            };
            res.status(200).send(categoryBooks);
          })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  /** @description displays all categories
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} edited category
    */
  editCategory(req, res) {
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid categoryId'
      });
    }

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404)
            .send({ message: 'Category does not exist in this Library' });
        }
        Category.findOne({
          where: {
            name: req.body.name
          }
        }).then((foundCategory) => {
          if (foundCategory) {
            return res.status(409)
              .send({ message: 'Category name already exists' });
          }
          category.update({
            name: req.body.name
          })
            .then((updatedCategory) => {
              res.status(200)
                .send({ message: 'Category Modified!', updatedCategory });
            })
            .catch(error => res.status(500).send(error.message));
        })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description displays all categories
    * @param {object} req HTTP request object
    * @param {object} res HTTP response object
    * @returns {object} response message object
    */
  deleteCategory(req, res) {
    const categoryId = parseInt(req.params.id, 10);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        message: 'Please enter a valid categoryId'
      });
    }
    Category.findById(categoryId, {
      include: [{
        model: Book,
        as: 'books',
      }]
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        if (category.books.length > 0) {
          return res.status(409).send({
            message: 'Category has books in it',
          });
        }
        category
          .destroy()
          .then(() => res.status(200)
            .send({ message: 'Category has been deleted', }))
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error.message));
  }

};
