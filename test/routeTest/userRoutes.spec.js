import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../../server/app';

require('dotenv').config();

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
        name: 'fred',
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        token = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });

  it('should return 400 when email is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        username: faker.internet.userName(),
        password: 'bookiiii',
        name: 'fred',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when username is null', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        password: 'bookiiii',
        name: 'fred',
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
        name: 'fred',
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
        name: 'fred',
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
        name: 'fred',
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 422);
        done();
      });
  });

  it('should return 409 if username is already taken', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: 'Fredrick_Ziemann39',
        password: 'bookiiii',
        name: 'fred',
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
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
        password: process.env.PASSWORD,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        adminToken = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });
  it('should return 201 when an google user logs in for the first time',
    (done) => {
      server.post('/api/v1/users/signin')
        .send({
          username: 'aimee2',
          password: 'bookiiii',
          name: 'amarachi',
          email: faker.internet.email(),
          googleId: '1234949u309',
          profilePic: 'https:ugjhjh.jpg'
        })
        .end((err, res) => {
          assert.equal(res.status, 201);
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

  it('should return 401 when password is wrong', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'aimee',
        password: 'password',
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        done();
      });
  });

  it('should return 400 when login form is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 when username is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        password: 'bookiiii',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when password is empty', (done) => {
    server.post('/api/v1/users/signin')
      .send({
        username: 'johniiiie',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 422 if old password is not correct',
    (done) => {
      server.put('/api/v1/user/password').set('x-access-token', token)
        .send({
          oldPassword: 'bookiiiiee',
          newPassword: 'bookiiii',
          confirmNewPassword: 'bookiiii',
        })
        .end((err, res) => {
          assert.equal(res.status, 422);
          done();
        });
    });
  it('should return 409 if new password is the same as old password',
    (done) => {
      server.put('/api/v1/user/password').set('x-access-token', token)
        .send({
          oldPassword: 'bookiiii',
          newPassword: 'bookiiii',
          confirmNewPassword: 'bookiiii',
        })
        .end((err, res) => {
          assert.equal(res.status, 409);
          done();
        });
    });
  it('should return 200 when password change is successful', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        oldPassword: 'bookiiii',
        newPassword: 'password',
        confirmNewPassword: 'password',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.message);
        done();
      });
  });
  it('should return 400 when oldPassword is null', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        newPassword: 'halooooo',
        confirmNewPassword: 'halooooo'
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when confirmNewPassword is null', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        oldPassword: 'password',
        newPassword: 'halooooo'
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 when newPassword is null', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', token)
      .send({
        oldPassword: 'password',
        confirmNewPassword: 'halooooo'
      })
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

  it('should return 409 when level is the same as user level', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 1,
        transactionId: 'andksm8999',
        amount: 2000
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
        done();
      });
  });

  it('should return 202 when level change is successful', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 2,
        transactionId: 'andksm8999',
        amount: 2000
      })
      .end((err, res) => {
        assert.equal(res.status, 202);
        assert.isNotNull(res.body.userDetails);
        done();
      });
  });
  it('should return 200 when transaction is confirmed', (done) => {
    server.put('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 2,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 400 when amount is null', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 2,
        transactionId: 'andksm8999',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });

  it('should return 400 when newLevelId is null', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        transactionId: 'andksm8999',
        amount: 2000
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 when new level does not exist', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 20,
        transactionId: 'andksm8999',
        amount: 2000
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 400 when transactionId is null', (done) => {
    server.put('/api/v1/user/level').set('x-access-token', token)
      .send({
        newLevelId: 2,
        amount: 2000
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isNotNull(res.body.userDetails);
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

  it('should return 400 when picture change form is empty', (done) => {
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
