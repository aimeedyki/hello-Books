const book = require('../models').Book;

module.exports = {
	//adds a book
  create(req, res) {
    return book
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
      .catch(error => console.log(error.message)); 
  },
 //modifys book
  modify(req, res) {
    book.update({
          title: req.body.title,
          image: req.body.image,
          description: req.body.description,
          quantity: req.body.quantity,
          categoryId: req.body.category,
      },
        { where: { id: req.body.id } 
      })
      .then(book => res.status(201).send("updated"))
      .catch(error => console.log(error.message)); 
  },
  //displays all books
  list(req, res) {
    return book
    .all()
    .then(books => res.status(200).send(books))
    .catch(error => res.status(400).send(error));
},

}