import {Category} from '../models';

export default {
  //creates a category
  addCategory(req, res) {
    return Category
      .create({
        category: req.body.category,
      })

      .then(categories => res.status(201).send(categories))
      .catch(error => res.status(400).send(error));
  },

  //displays all categories
  list(req, res) {
    return Category
      .all()
      .then(categories => res.status(200).send(categories))
      .catch(error => res.status(400).send(error));
  },
};
