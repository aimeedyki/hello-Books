const category = require('../models').Category;

module.exports = {
  //user borrows a book and creates a history record
  create(req, res) {
    return category
      .create({
        category: req.body.category,
        })
      .then(history => res.status(201).send(category))
      .catch(error => console.log(error.message)); 
  },
}