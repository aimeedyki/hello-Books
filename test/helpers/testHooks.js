import supertest from 'supertest';
import faker from 'faker';

import app from '../../server/app';

require('dotenv').config();

const server = supertest.agent(app);

export const userToken = () => new Promise((resolve) => {
  let token = '';
  let adminToken = '';
  server.post('/api/v1/users/signup')
    .send({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'bookiiii',
      name: 'fred',
      profilepic: faker.internet.avatar(),
    })
    .end((err, res) => {
      token = res.body.token;
      server.post('/api/v1/users/signin')
        .send({
          username: 'aimee',
          password: process.env.PASSWORD,
        })
        .end((err, res) => {
          adminToken = res.body.token;
          resolve({
            token,
            adminToken
          });
        });
    });
});
