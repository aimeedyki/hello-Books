import supertest from 'supertest';
import {assert} from 'chai';
import app from '../app';
const server = supertest.agent(app);
import faker from 'faker';
let token = '';
let adminToken = '';

describe('User', ()=>{
  it('should return 201 when a regular user is created', (done)=>{
    server.post('/api/v1/users/signup')
      .send( {'email': faker.internet.email(),
        'firstname': faker.name.firstName(),
        'lastname': faker.name.lastName(),
        'username': faker.internet.userName(),
        'password': 'bookiiii',
        'level': 'rookie',
        'profilepic': faker.internet.avatar(),
      } )
      .end((err, res)=>{
        //console.log(err.message);
        assert.equal(res.status, 201);
        token = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });
  it('should return 201 when an admin user is created', ()=>{
    before((done)=>{
    server.post('/api/v1/users/signup')
      .send( {'email': faker.internet.email(),
        'firstname': faker.name.firstName(),
        'lastname': faker.name.lastName(),
        'username': 'Fredrick_Ziemann39',
        'password': 'bookiiii',
        'level': 'admin',
        'profilepic': faker.internet.avatar(),
      } )
      .end((err, res)=>{
        assert.equal(res.status, 201);
        adminToken = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
    });
  });
  it('should return 400 for an empty form', (done =>{
    server.post('/api/v1/users/signup')
      .send({})
      .end((err, res)=>{
        console.log(err);
        assert.equal(res.status, 400);
        done();
      });
  }));

  it ('should return 200 when login is successful', (done) =>{
    server.post('/api/v1/users/signin')
      .send({'username': 'Fredrick_Ziemann39',
        'password': 'bookiiii',
      })
      .end((err, res)=>{
        console.log(err);
        assert.equal(res.status, 200)
        done();
      });
  });

  it ('should return 404 when login is unsuccessful', (done) =>{
    server.put('/api/v1/users/signin')
      .send({'username': 'johniiiie',
        'password': 'bookiiii',
      })
      .end((err, res)=>{
        assert.equal(res.status, 404)
        console.log(res.body);
        done();
      });
  });
});

describe ('Category', ()=>{
  it ('should return 201 when a category is added', (done)=>{
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({ 'category': 'EDUCATIONAL'
      })
      .end((err, res)=>{
        assert.equal(res.status, 201),
        done();
      });
  });
  it ('should return 400 when an empty form is submitted', (done)=>{
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({ 'category': [] })
      .end((err, res)=>{
        assert.equal(res.status, 400),
        done();
      });
  });
  it ('should return 200 when displaying all categories in the library', (done)=>{
    server.get('/api/v1/category').set('x-access-token', adminToken)
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});

describe('Book', ()=>{
  it ('should return 201 when a book is added', (done)=>{
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({'title': faker.lorem.sentence(),
        'author': faker.name.findName(),
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
  it('should return 400 for an empty form', (done =>{
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({})
      .end((err, res)=>{
        assert.equal(res.status, 400);
        done();
      });
  }));
  it ('should return 200 when a book is modified', (done)=>{
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({'title': 'Midnight wail',
        'author': 'James Hardy',
        'description':'a tale about family',
        'image': 'assd.jpg',
        'quantity': '10',
        'categoryId': 1,
      })
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
  it ('should return 404 if book to be modified is not found', (done)=>{
    server.put('/api/v1/books/106').set('x-access-token', adminToken)
      .send({'title': 'Midnight xxxyyy',
        'author': 'James Hardy',
        'description':'a tale about family',
        'image': 'assd.jpg',
        'quantity': '10',
        'categoryId': 1,
      })
      .end((err, res)=>{
        assert.equal(res.status, 404),
        done();
      });
  });
  it ('should return 200 when displaying all books', (done)=>{
    server.get('/api/v1/books').set('x-access-token', token)
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});

describe ('History', ()=>{
  it ('should return 201 when a book is borrowed', (done)=>{
    server.post('/api/v1/users/2/books').set('x-access-token', token)
      .send({
        'bookId': 1,
      })
      .end((err, res)=>{
        assert.equal(res.status, 201),
        done();
      });
  });
  it ('should return 404 if book to be borrowed does not exist', (done)=>{
    server.post('/api/v1/users/1/books').set('x-access-token', token)
      .send({'bookId': 200,
      })
      .end((err, res)=>{
        assert.equal(res.status, 404),
        done();
      });
  });
  it ('should return 200 when a book is returned', (done)=>{
    server.put('/api/v1/users/2/books').set('x-access-token', token)
      .send({
        'bookId': 1,
      })
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
  it ('should return 200 when displaying all books a user has borrowed', (done)=>{
    server.get('/api/v1/users/1/books').set('x-access-token', token)
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
  it ('should return 200 when displaying all books a user has borrowed but not returned', (done)=>{
    server.get('/api/v1/users/1/books?returned=false').set('x-access-token', token)
      .end((err, res)=>{
        assert.equal(res.status, 200),
        done();
      });
  });
});

