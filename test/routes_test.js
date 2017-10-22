import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../server/app';

const server = supertest.agent(app);

let token = '';
let adminToken = '';

describe('User', () => {
  it('should return 201 when a regular user is created', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: 'Fredrick_Ziemann39',
        password: 'bookiiii',
        levelId: 1,
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        token = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });

  it('should return 400 signup form is empty', (done) => {
    server.post('/api/v1/users/signup')
      .send({ })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when login is successful', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'Fredrick_Ziemann39',
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.User);
        done();
      });
  });

  it('should return 200 when an admin user login is successful', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'aimee',
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        adminToken = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });

  it('should return 403 when login is unsuccessful', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'johniiiie',
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.isNotNull(res.body.User);
        done();
      });
  });

  it('should return 400 login form is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({ })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when password change is successful', (done) => {
    server.put('/api/v1/users/1').set('x-access-token', token)
      .send({
        oldPassword: 'bookiiii',
        newPassword: 'journies',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.message);
        done();
      });
  });

  it('should return 400 password change form is empty', (done) => {
    server.put('/api/v1/users/1').set('x-access-token', token)
      .send({ })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when level change is successful', (done) => {
    server.put('/api/v1/users/1/level').set('x-access-token', token)
      .send({
        levelId: 2
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.userDetails);
        done();
      });
  });

  it('should return 400 when level change form is empty', (done) => {
    server.put('/api/v1/users/1/level').set('x-access-token', token)
      .send({ })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when picture update is successful', (done) => {
    server.put('/api/v1/users/1/image').set('x-access-token', token)
      .send({
        profilepic: 'reg.jpg'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.user);
        done();
      });
  });

  it('should return 400 picture change form is empty', (done) => {
    server.put('/api/v1/users/1/image').set('x-access-token', token)
      .send({ })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when displaying a users profile', (done) => {
    server.get('/api/v1/users/1').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.User);
        done();
      });
  });
});

describe('Category', () => {
  it('should return 201 when a category is added', (done) => {
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({
        name: 'EDUCATIONAL'
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.category);
        done();
      });
  });
  it('should return 400 when an empty form is submitted', (done) => {
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({ category: [] })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 200 when displaying all categories in the library',
    (done) => {
      server.get('/api/v1/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.categories);
          done();
        });
    });
  it('should return 200 when displaying books by categories in the library',
    (done) => {
      server.get('/api/v1/category/1').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.category);
          done();
        });
    });
});

describe('Book', () => {
  it('should return 201 when a book is added', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: faker.lorem.sentence(),
        author: faker.name.findName(),
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 201 when a book is added', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 201 when a book is added', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'change is now',
        author: 'howie mandel',
        description: 'a tale about changey',
        image: 'assd.jpg',
        quantity: '0',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 when title field is empty or null', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when author field is empty or null', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 when description field is empty or null', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        author: 'howie mandel',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 when an empty form is submitted', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 200 when a book is deleted', (done) => {
    server.delete('/api/v1/books/2').set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 200 when a book is modified', (done) => {
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({
        title: 'Midnight wail',
        author: 'James Hardy',
        description: 'a tale about family',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 404 if book to be modified is not found', (done) => {
    server.put('/api/v1/books/106').set('x-access-token', adminToken)
      .send({
        title: 'Midnight xxxyyy',
        author: 'James Hardy',
        description: 'a tale about family',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 200 when displaying all books', (done) => {
    server.get('/api/v1/books').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.Books);
        done();
      });
  });
  it('should return 200 when getting a single book', (done) => {
    server.get('/api/v1/books/1').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
});

describe('History', () => {
  it('should return 201 when a book is borrowed', (done) => {
    server.post('/api/v1/users/1/books').set('x-access-token', token)
      .send({
        bookId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 404 if book to be borrowed does not exist', (done) => {
    server.post('/api/v1/users/1/books').set('x-access-token', token)
      .send({
        bookId: 200,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 404 if book to be borrowed\'s quantity is zero', (done) => {
    server.post('/api/v1/users/1/books').set('x-access-token', token)
      .send({
        bookId: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 404 if user is not registered', (done) => {
    server.post('/api/v1/users/17/books').set('x-access-token', token)
      .send({
        bookId: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });

  it('should return 200 when a book is returned', (done) => {
    server.put('/api/v1/users/1/books').set('x-access-token', token)
      .send({
        historyId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 404 when a book to be returned has not been borrowed',
    (done) => {
      server.put('/api/v1/users/1/books').set('x-access-token', token)
        .send({
          historyId: 10,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.isNotNull(res.body.notification);
          done();
        });
    });
  it('should return 200 when displaying all books a user has borrowed',
    (done) => {
      server.get('/api/v1/users/1/books').set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.history);
          done();
        });
    });
  it('should return 200 when displaying all books a user has not returned',
    (done) => {
      server.get('/api/v1/users/1/books?returned=false')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
});

describe('Notification', () => {
  it('should return 200 when admin displays notification', (done) => {
    server.get('/api/v1/notifications').set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
});
