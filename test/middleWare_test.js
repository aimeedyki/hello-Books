import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../server/app';

const server = supertest.agent(app);

let token2 = '';

describe('Authentication', () => {
  it('should return 403 if token is not a token', (done) => {
    server.put('/api/v1/users/1').set('x-access-token', '')
      .send({
        oldPassword: 'bookiiii',
        newPassword: 'journies',
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
        levelId: 1,
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
});
