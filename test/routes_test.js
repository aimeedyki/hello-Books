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

  it('should return 400 email is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        username: faker.internet.userName(),
        password: 'bookiiii',
        levelId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when username  is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        password: 'bookiiii',
        levelId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when password is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        levelId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when level is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 422 if password is not up to 8 characters', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: 'book',
        levelId: 1,
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
        done();
      });
  });

  it('should return 422 if email is invalid', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: 'aimee@y',
        username: faker.internet.userName(),
        password: 'bookiiii',
        levelId: 1,
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
        done();
      });
  });

  it('should return 422 if username is already taken', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: 'Fredrick_Ziemann39',
        password: 'bookiiii',
        levelId: 1,
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
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

  it('should return 404 when username does not exist', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'johniiiie',
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });

  it('should return 403 when password is wrong', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'aimee',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        done();
      });
  });

  it('should return 400 login form is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 username is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 password is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'johniiiie',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 200 when password change is successful', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        newPassword: 'password',
        confirmNewPassword: 'password',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.message);
        done();
      });
  });

  it('should return 400 password change form is empty', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 if passwords do not match', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        newPassword: 'bookiii3',
        confirmNewPassword: 'journies',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when level change is successful', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 2
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.userDetails);
        done();
      });
  });

  it('should return 400 when level change form is empty', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 200 when picture update is successful', (done) => {
    server.put('/api/v1/user/profile-image').set('x-access-token', token)
      .send({
        profilePic: 'reg.jpg'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.user);
        done();
      });
  });

  it('should return 400 picture change form is empty', (done) => {
    server.put('/api/v1/user/profile-image').set('x-access-token', token)
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 if user to change image does not exist', (done) => {
    server.put('/api/v1/users/profile-image').set('x-access-token', token)
      .send({
        profilepic: 'reg.jpg'
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });

  it('should return 200 when displaying a users profile', (done) => {
    server.get('/api/v1/user/profile').set('x-access-token', token)
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
      server.get('/api/v1/1/category').set('x-access-token', adminToken)
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
  it('should return 400 when search parameter is null', (done) => {
    server.get('/api/v1/search?term=').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body);
        done();
      });
  });
  it('should return 404 when no books match search criteria', (done) => {
    server.get('/api/v1/search?term=xyz').set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 404);
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

describe('History', () => {
  it('should return 201 when a book is borrowed', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', token)
      .send({
        bookId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 400 if bookId is not valid', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', token)
      .send({
        bookId: 'gjk',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 if book to be borrowed does not exist', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', token)
      .send({
        bookId: 200,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 404 if book to be borrowed\'s quantity is zero', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', token)
      .send({
        bookId: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });

  it('should return 200 when a book is returned', (done) => {
    server.put('/api/v1/user/return-book').set('x-access-token', token)
      .send({
        historyId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 400 when a historyId is not valid', (done) => {
    server.put('/api/v1/user/return-book').set('x-access-token', token)
      .send({
        historyId: 'hbjjbj',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 404 when a book to be returned has not been borrowed',
    (done) => {
      server.put('/api/v1/user/return-book').set('x-access-token', token)
        .send({
          historyId: 10,
        })
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.isNotNull(res.body.notification);
          done();
        });
    });
  it('should return 409 when a book to be returned has been returned',
    (done) => {
      server.put('/api/v1/user/return-book').set('x-access-token', token)
        .send({
          historyId: 1,
        })
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.isNotNull(res.body.notification);
          done();
        });
    });
  it('should return 200 when displaying all books a user has borrowed',
    (done) => {
      server.get('/api/v1/user/books').set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.history);
          done();
        });
    });
  it('should return 200 when displaying paginated history',
    (done) => {
      server.get('/api/v1/user/books?offset=0&limit=2')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.history);
          done();
        });
    });
  it('should return 200 when displaying all books a user has not returned',
    (done) => {
      server.get('/api/v1/user/books?returned=false')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  it('should return 200 when displaying paginated not returned books',
    (done) => {
      server.get('/api/v1/user/books?returned=false&offset=0&limit=1')
        .set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.history);
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
