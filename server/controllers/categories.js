import {Category} from '../models';
import {Book} from '../models';

export default {
  // creates a category
  addCategory(req, res) {
    return Category
      .create({
        category: req.body.category,
      })

      .then(categories => res.status(201).send(categories))
      .catch(error => res.status(400).send(error));
  },

  // displays all categories
  list(req, res) {
    return Category
      .all()
      .then(categories => res.status(200).send(categories))
      .catch(error => res.status(400).send(error));
  },

  //displays categories with the books in them
  display(req, res){
    return Category
      .findById(req.params.id, {
        include: [{
          model: Book,
          as: 'books',
        }],
      })
      .then(category => res.status(200).send(category))
      .catch(error => res.status(400).send(error.message));
  },
};
