import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../../server/app';
import { userToken } from '../helpers/testHooks';

const server = supertest.agent(app);
let token = '';
let adminToken = '';

describe('Category', () => {
  before((done) => {
    userToken()
      .then((responseToken) => {
        token = responseToken.token;
        adminToken = responseToken.adminToken;
        done();
      });
  });
  it('should return 200 when displaying all categories but there are none',
    (done) => {
      server.get('/api/v1/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
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
  it('should return 201 when a category is added', (done) => {
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({
        name: 'ROMANCE'
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.category);
        done();
      });
  });
  it('should return 400 when an empty form is submitted', (done) => {
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 409 when a category to be added already exists', (done) => {
    server.post('/api/v1/category').set('x-access-token', adminToken)
      .send({
        name: 'EDUCATIONAL'
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
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
      server.get('/api/v1/2/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 400 when categoryId to display is not valid',
    (done) => {
      server.get('/api/v1/jhjnjn/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
  it('should return 404 when categoryId to display is not found',
    (done) => {
      server.get('/api/v1/567/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  it('should return 200 when a category is modified', (done) => {
    server.put('/api/v1/1/category').set('x-access-token', adminToken)
      .send({
        name: 'Thriller'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 200 when a category name field is null', (done) => {
    server.put('/api/v1/1/category').set('x-access-token', adminToken)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 400 when categoryId to modify is not valid',
    (done) => {
      server.put('/api/v1/jhjnjn/category').set('x-access-token', adminToken)
        .send({
          name: 'Thriller'
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 404 when category to modify is not found',
    (done) => {
      server.put('/api/v1/404/category').set('x-access-token', adminToken)
        .send({
          name: 'Thriller'
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 409 when category to modify to already exists',
    (done) => {
      server.put('/api/v1/2/category').set('x-access-token', adminToken)
        .send({
          name: 'Thriller'
        })
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 200 when category is deleted',
    (done) => {
      server.delete('/api/v1/2/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 404 when category to delete is not found',
    (done) => {
      server.delete('/api/v1/404/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 400 when categoryId to delete is not valid',
    (done) => {
      server.delete('/api/v1/jhjnjn/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.isNotNull(res.body.category);
          done();
        });
    });
});

describe('Book', () => {
  it('should return 200 with message when no books exist', (done) => {
    server.get('/api/v1/books').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 201 when a book is added', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: faker.lorem.sentence(),
        author: faker.name.findName(),
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: '1',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 409 when category to delete has books in it',
    (done) => {
      server.delete('/api/v1/1/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.isNotNull(res.body.category);
          done();
        });
    });
  it('should return 200 when displaying books in a category with books',
    (done) => {
      server.get('/api/v1/1/category').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.category);
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
        categoryId: '1',
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
        title: 'howie it',
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '0',
        categoryId: '1',
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

  it('should return 400 when quantity is not valid', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: 'slmsklas',
        categoryId: ' 1',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 when categoryId field is not valid', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: 'jhjhkh',
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
  it('should return 404 when category does not exist', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'a good day',
        author: 'howie mandel',
        description: 'a tale about a day',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: '100',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 409 when the book to be added exists', (done) => {
    server.post('/api/v1/books').set('x-access-token', adminToken)
      .send({
        title: 'howie made it',
        author: 'howie mandel',
        description: 'a tale about a jungle boy',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: '1',
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
        assert.isNotNull(res.body.Book);
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
  it('should return 400 if the bookId is not valid', (done) => {
    server.delete('/api/v1/books/sfgh').set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 when getting a single book if it does not exist',
    (done) => {
      server.delete('/api/v1/books/100').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  it('should return 200 when a book is modified', (done) => {
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({
        title: 'Midnight wail',
        author: 'James Hardy'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 when quantity is not valid', (done) => {
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({
        quantity: 'dfgcgh'
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 when categoryId is not valid', (done) => {
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({
        categoryId: 'dfgcgh'
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 404 if book to be modified is not found', (done) => {
    server.put('/api/v1/books/106').set('x-access-token', adminToken)
      .send({
        title: 'Midnight xxxyyy'
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 400 when there are no changes to modify', (done) => {
    server.put('/api/v1/books/1').set('x-access-token', adminToken)
      .send({
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 400 if the bookId is not valid', (done) => {
    server.put('/api/v1/books/asdf').set('x-access-token', adminToken)
      .send({
        title: 'Midnight xxxyyy',
        author: 'James Hardy',
        description: 'a tale about family',
        image: 'assd.jpg',
        quantity: '10',
        categoryId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
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
  it('should return 200 when searching all books', (done) => {
    server.get('/api/v1/search?term=jam').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('should return 200 when searching all books in a caegory', (done) => {
    server.get('/api/v1/search?term=jam&category=1')
      .set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('should return 400 when search parameter is null', (done) => {
    server.get('/api/v1/search?term=').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('should return 200 when no books match search criteria', (done) => {
    server.get('/api/v1/search?term=xyz').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body);
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
  it('should return 400 if the bookId is not valid', (done) => {
    server.get('/api/v1/books/sfgh').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.Book);
        done();
      });
  });
  it('should return 404 when getting a single book if it does not exist',
    (done) => {
      server.get('/api/v1/books/100').set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.isNotNull(res.body.Book);
          done();
        });
    });
});
