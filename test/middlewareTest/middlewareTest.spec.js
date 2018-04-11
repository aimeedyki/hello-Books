import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../../server/app';

const server = supertest.agent(app);

let token2 = '';
const errorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFkb'
  + 'WluIjp0cnVlLCJpYXQiOjE1MTE0NDY5MzIsImV4cCI6MTUxMTQ4MjkzMn0.o8lQNA304KlGeK'
  + 'XiBySRe098Zht1XtNJyfWiBx45iGg';

describe('Authentication', () => {
  it('should return 403 if token is not a token', (done) => {
    server.put('/api/v1/user/password').set('x-access-token', '')
      .send({
        newPassword: 'bookiiii',
        confirmNewPassword: 'journies',
      })
      .end((err, res) => {
        assert.equal(res.status, 403);
        done();
      });
  });
  it('should return 201 when a regular user is created', (done) => {
    server.post('/api/v1/users/signup')
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: 'bookiiii',
        name: 'fred',
        profilepic: faker.internet.avatar(),
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        token2 = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });
  it('should return 401 if token is not an admin token', (done) => {
    server.post('/api/v1/category').set('x-access-token', token2)
      .send({
        name: 'EDUCATIONAL'
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        done();
      });
  });
  it('should return 401 if error with token', (done) => {
    server.post('/api/v1/category').set('x-access-token', errorToken)
      .send({
        name: 'EDUCATIONAL'
      })
      .end((err, res) => {
        assert.equal(res.status, 401);
        done();
      });
  });
});
