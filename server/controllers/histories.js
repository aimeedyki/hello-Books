const history = require('../models').History;

module.exports = {
  //user borrows a book and creates a history record
  create(req, res) {
    return history
      .create({
        title: req.body.title,
        borrowedDate: req.body.borrowedDate,
        return:req.body.return,
        userId: req.params.userId,
        bookId: req.body.bookId,  
        })
      .then(history => res.status(201).send(history))
      .catch(error => console.log(error.message)); 
  },
  //returns the book by updating the history with return date
  modify(req, res) {
    history.update({
     title: req.body.title,
        borrowed: req.body.borrowed,
          returnDate: req.body.returnDate,
          returned: req.body.returned,
  },
    { where: { userId: req.params.userId, title:req.body.title } 
  })
      .then(history => res.status(201).send("book returned"))
      .catch(error => console.log(error.message)); 
  },
   //displays user history
  list(req, res) {

    return history
    .all({ where: { userId: req.params.userId }})

    .then(histories => res.status(200).send(histories))
    .catch(error => res.status(400).send(error.message));
},
//display books not neturned
returned(req, res) {
    return history
    .all({ where: { userId: req.params.userId, returned: req.query.returned}})

    .then(histories => res.status(200).send(histories))
    .catch(error => res.status(400).send(error.message));
},

}