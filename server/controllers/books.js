import {Book} from '../models';

export default {
//adds a book
  produce(req, res) {
    return Book
      .create({
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        categoryId: req.body.categoryId,
      })
      .then(book => res.status(201).send(book))
      .catch(error =>res.status(400).send(error.message));
  },

  //modifies book
  modify(req, res) {
    return Book
      .update({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        quantity: req.body.quantity,
        categoryId: req.body.categoryId,
        author: req.body.author,
        category: req.body.category,
      },
      { where: { id: req.params.id },
        returning: true,
        plain: true
      })
      .then(book => res.status(200).send(book))
      .catch(error => res.status(400).send(error.message));
  },

  //displays all books
  list(req, res) {
    return Book
      .all()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },

};