import { Book, Category } from '../models';

export default {
  /**
   *  adds a book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} book
   */
  addBook(req, res) {
    return Book.find({ where: { title: req.body.title } })
      .then((book) => {
        if (book) {
          return res.status(409)
            .send({ message: 'Book already exists in this Library' });
        }
        Book.create({
          title: req.body.title,
          author: req.body.author,
          image: req.body.image,
          description: req.body.description,
          quantity: req.body.quantity,
          categoryId: req.body.categoryId,
        });
        res.status(201).send(book);
      })
      .catch(error => res.status(500).send(error.message));
  },

  /**
   *  modifies book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} book
   */
  modify(req, res) {
    return Book.findById(req.params.id)
      .then((book) => {
        if (!book) {
          return res.status(404)
            .send({ message: 'Book does not exist in this Library' });
        }
        Book.update({
          title: req.body.title,
          image: req.body.image,
          description: req.body.description,
          quantity: req.body.quantity,
          categoryId: req.body.categoryId,
          author: req.body.author,
        }, { where: { id: req.params.id }, returning: true, plain: true });
        res.status(200).send(book);
      })
      .catch(error => res.status(400).send(error.message));
  },

  // displays all books
  list(req, res) {
    return Book
      .all({
        include: [{
          model: Category,
          as: 'category',
          attributes: ['category'],
        }]
      })
      .then((books) => {
        const allBooks = { books };
        res.status(200).send(allBooks);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * displays one book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} book
   */
  viewBook(req, res) {
    return Book.findById(req.params.id)
      .then((book) => {
        if (!book) {
          return res.status(404)
            .send({ message: 'Book does not exist in this Library' });
        }
        const thisBook = { book };
        res.status(200).send(thisBook);
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
   * deletes a book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} book
   */
  remove(req, res) {
    return Book
      .find({
        where: {
          id: req.params.id,
        },
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(200)
            .send({ message: 'Book has been deleted', }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
