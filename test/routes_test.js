import supertest from 'supertest';
import {assert} from 'chai';
import app from '../app';
const server = supertest.agent(app);

describe('User', ()=>{
  it('should return 201 when a new user is created', (done)=>{
    server.post('/api/v1/users/signup')
      .send( {'email': 'joe@gmail.com',
        'firstname': 'John',
        'lastname': 'James',
        'username': 'joejohn',
        'password': 'jargonuu',
        'level': 'rookie',
        'profilepic': 'fgh.jpg'
      } )
      .end((err, res)=>{
        assert.equal(res.status, 201)
        console.log(res.body);
        done();
      });
  });

  it('should return 400 for an empty form', (done =>{
    server.post('/api/v1/users/signup')
      .send({})
      .end((err, res)=>{
        assert.equal(res.status, 400);
        done();
      });
  }));

  it ('should return 200 when login is successful', (done) =>{
    server.put('/api/v1/users/signin')
      .send({'username': 'jamieeee',
        'password': 'bookieee',
      })
      .end((err, res)=>{
        assert.equal(res.status, 200)
        console.log(res.body);
        done();
      });
  });
});

describe('Book', ()=>{
  it ('should return 201 when a book is added', (done)=>{
    server.post('/api/v1/books')
      .send({'title': 'George jungle',
        'author': 'Waltz Disney',
        'description':'a tale about a jungle boy',
        'image': 'assd.jpg',
        'quantity': '10',
        'categoryId': ' 1',
      })
      .end((err, res)=>{
        assert.equal(res.status, 201)
        done();
      });
  });
  it ('should return 200 when a book is modified', (done)=>{
    server.put('/api/v1/books/1')
      .send({'title': 'Midnight Monster',
        'author': 'James Hardy',
        'description':'a tale about family',
        'image': 'assd.jpg',
        'quantity': '10',
        'categoryId': ' 1',
      })
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });

  it ('should return 200 when displaying all books', (done)=>{
    server.get('/api/v1/books')
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});

describe ('History', ()=>{
  it ('should return 201 when a book is borrowed', (done)=>{
    server.post('/api/v1/users/1/books')
      .send({
        'borrowedDate': '02/08/2017',
        'return': 'false',
        'bookId': '6',
      })
      .end((err, res)=>{
        assert.equal(res.status, 201),
        done();
      });
  });
  it ('should return 200 when a book is returned', (done)=>{
    server.put('/api/v1/users/1/books')
      .send({
        'borrowedDate': '02/08/2017',
        'return': 'false',
        'bookId': '2',
      })
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
  it ('should return 200 when displaying all books a user has borrowed', (done)=>{
    server.get('/api/v1/users/1/books')
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
  it ('should return 200 when displaying all books a user has borrowed but not returned', (done)=>{
    server.get('/api/v1/users/1/books?return=false')
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});

describe ('Category', ()=>{
  it ('should return 201 when a category is added', (done)=>{
    server.post('/api/v1/category')
      .send({ 'category': 'EDUCATIONAL'
      })
      .end((err, res)=>{
        assert.equal(res.status, 201),
        done();
      });
  });
  it ('should return 200 when displaying all categories in the library', (done)=>{
    server.get('/api/v1/users/1/books?return=false')
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});