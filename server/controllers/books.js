import { Book, Category, History } from '../models';
import paginate from '../middleware/book';
import addBookValidation from '../helpers/addBookValidation';
import editBookValidation from '../helpers/editBookValidation';

export default {
  /** @description adds a book
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} created book
   */
  addBook(req, res) {
    if (addBookValidation(req.body).isValid) {
      const title = req.body.title;
      const author = req.body.author;
      const description = req.body.description;
      const quantity = parseInt(req.body.quantity, 10);
      const categoryId = parseInt(req.body.categoryId, 10);
      const image = req.body.image;
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
              createdBook.getCategory()
                .then((category) => {
                  const newBook = {
                    id: createdBook.id,
                    title: createdBook.title,
                    author: createdBook.author,
                    category: category.name,
                    image: createdBook.image,
                    description: createdBook.description,
                    quantity: createdBook.quantity,
                    createdAt: createdBook.createdAt
                  };
                  res.status(201).send({ message: 'Book added!', newBook });
                })
                .catch(error => res.status(500).send(error.message));
            })
              .catch(error => res.status(500).send(error.message));
          })
          .catch(error => res.status(500).send(error.message));
      })
        .catch(error => res.status(500).send(error.message));
    }
    if (addBookValidation(req.body).message) {
      res.status(400).send({ message: addBookValidation(req.body).message });
    }
  },

  /** @description modifies book
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} book
   */
  modifyBook(req, res) {
    if (editBookValidation(req).isValid) {
      const bookId = parseInt(req.params.id, 10);
      Book.findById(bookId)
        .then((book) => {
          if (!book) {
            return res.status(404)
              .send({ message: 'Book does not exist in this Library' });
          }
          book.update({
            title: req.body.title || book.title,
            image: req.body.image || book.image,
            description: req.body.description || book.description,
            quantity: req.body.quantity || book.quantity,
            categoryId: req.body.categoryId || book.categoryId,
            author: req.body.author || book.author,
          })
            .then((updatedBook) => {
              res.status(200).send({ message: 'Book Modified!', updatedBook });
            })
            .catch(error => res.status(500).send(error.message));
        })
        .catch(error => res.status(500).send(error.message));
    }
    if (editBookValidation(req).message) {
      res.status(400).send({ message: editBookValidation(req).message });
    }
  },

  /** @description displays all books
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} books
   */
  listBooks(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    Book
      .findAndCountAll({
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name'],
          paranoid: false
        }],
        order: [['title', 'ASC']],
        limit,
        offset
      })
      .then((books) => {
        if (books.rows.length < 1) {
          return res.status(200)
            .send({ message: 'Sorry, there are no books available' });
        }
        const allBooks = {
          books: books.rows, pagination: paginate(offset, limit, books)
        };
        res.status(200).send({ message: 'Success', allBooks });
      })
      .catch(error => res.status(500).send(error));
  },
  /** displays one book
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
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
        const thisBook = { message: 'Success!', book };
        res.status(200).send(thisBook);
      })
      .catch(error => res.status(500).send(error.message));
  },
  /** deletes a book
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   * @returns {object} book
   */
  deleteBook(req, res) {
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

  searchBooks(req, res) {
    const searchQuery = req.query.term || null;
    const category = req.query.category || null;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    const whereClause = {
      $or: [{
        title:
        { $iLike: `%${searchQuery}%` }
      }, {
        author:
        { $iLike: `%${searchQuery}%` }
      }]
    };
    if (category) {
      whereClause.$and = [{ categoryId: category }];
    }
    if (searchQuery === null) {
      return res.status(400)
        .send({ message: 'Please enter your search term' });
    }
    if (searchQuery.length > 0) {
      Book
        .findAndCountAll({
          where: whereClause,
          include: [{
            model: Category,
            as: 'category',
            attributes: ['name'],
            paranoid: false
          }],
          limit,
          offset
        })
        .then((books) => {
          const foundBooks = {
            books: books.rows, pagination: paginate(offset, limit, books)
          };
          if (books.rows.length === 0) {
            return res.status(404)
              .send({ message: 'Sorry no books match your search term' });
          }
          return res.status(200).send({ message: 'Success', foundBooks });
        })
        .catch(error => res.status(500).send(error.message));
    }
  }

};
