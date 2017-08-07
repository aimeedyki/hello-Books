const category = require('../models').Category;

module.exports = {
  //creates a category
  create(req, res) {
    return category
      .create({
        category: req.body.category,
        })
      .then(categories => res.status(201).send(categories))
      .catch(error => console.log(error.message)); 
  },
  //displays all categories
  list(req, res) {
    return category
    .all()
    .then(categories => res.status(200).send(categories))
    .catch(error => res.status(400).send(error));
},
}