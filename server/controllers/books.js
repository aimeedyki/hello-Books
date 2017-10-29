import { Book, Category, History } from '../models';
import paginate from '../middleware/book';

export default {
  /** @description adds a book
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} book
   */
  addBook(req, res) {
    const title = req.body.title || null;
    const author = req.body.author || null;
    const description = req.body.description || null;
    const quantity = parseInt(req.body.quantity, 10) || null;
    const categoryId = req.body.categoryId || null;
    const image = req.body.image || null;

    if (title === null) {
      return res.status(400).send({
        message: 'Please enter book title'
      });
    }
    if (author === null) {
      return res.status(400).send({
        message: 'Please enter author'
      });
    }
    if (description === null) {
      return res.status(400).send({
        message: 'Please enter a description'
      });
    }
    if (isNaN(quantity)) {
      return res.status(400).send({
        message: 'Please enter a valid quantity'
      });
    }
    if (categoryId === null) {
      return res.status(400).send({
        message: 'Please enter category'
      });
    }
    Category.findOne({
      where: {
        id: categoryId
      }
    }).then((foundCategory) => {
      if (!foundCategory) {
        return res.status(404)
          .send({ message: 'Category does not exist' });
      }
      Book.findOne({
        where: {
          $and: [{
            title
          }, { author }]
        }
      })
        .then((book) => {
          if (book) {
            return res.status(409)
              .send({ message: 'Book already exists in this Library' });
          }
          Book.create({
            title,
            author,
            image,
            description,
            quantity,
            categoryId,
          }).then((createdBook) => {
            res.status(201).send({ createdBook });
          })
            .catch(error => res.status(500).send(error.message));
        })
        .catch(error => res.status(500).send(error.message));
    })
      .catch(error => res.status(500).send(error.message));
  },
  /** @description modifies book
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} book
   */
  modify(req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid bookId'
      });
    }
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404)
            .send({ message: 'Book does not exist in this Library' });
        }
        book.update({
          title: req.body.title,
          image: req.body.image,
          description: req.body.description,
          quantity: req.body.quantity,
          categoryId: req.body.categoryId,
          author: req.body.author,
        })
          .then((updatedBook) => {
            res.status(200).send({ updatedBook });
          })
          .catch(error => res.status(500).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  },

  /** @description displays all books
   * @param {any} req HTTP request object
   * @param {any} res HTTP response object
   * @returns {object} books
   */
  list(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    Book
      .findAndCountAll({
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
        const allBooks = {
          books: books.rows, pagination: paginate(offset, limit, books)
        };
        res.status(200).send(allBooks);
      })
      .catch(error => res.status(500).send(error));
  },
  /** displays one book
     * @param {any} req
     * @param {any} res
     * @returns {object} book
     */
  viewBook(req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid bookId'
      });
    }
    Book.findById(bookId, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name'],
      }]
    })
      .then((book) => {
        if (!book) {
          return res.status(404)
            .send({ message: 'Book does not exist in this Library' });
        }
        const thisBook = { book };
        res.status(200).send(thisBook);
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** deletes a book
   * @param {any} req
   * @param {any} res
   * @returns {object} book
   */
  remove(req, res) {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid bookId'
      });
    }
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        History.findOne({
          where: {
            $and: [{
              bookId
            }, { returned: false }]
          }
        })
          .then((history) => {
            if (history) {
              return res.status(409).send({
                message: `A copy of this book has been rented out.
                Please wait for all copies to come back before you delete it`
              });
            }
            book
              .destroy()
              .then(() => res.status(200)
                .send({ message: 'Book has been deleted', }))
              .catch(error => res.status(500).send(error));
          })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};
