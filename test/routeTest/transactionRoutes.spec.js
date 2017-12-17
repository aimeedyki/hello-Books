import supertest from 'supertest';
import { assert } from 'chai';

import app from '../../server/app';
import { userToken } from '../helpers/testHooks';

require('dotenv').config();

const server = supertest.agent(app);

let token = '';
let adminToken = '';

describe('Notification', () => {
  before((done) => {
    userToken()
      .then((responseToken) => {
        token = responseToken.token;
        adminToken = responseToken.adminToken;
        done();
      });
  });
  it('should return 200 when admin displays notification', (done) => {
    server.get('/api/v1/notifications').set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
});

describe('Transaction', () => {
  it('should return 400 when transactionid is invalid', (done) => {
    server.put('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 'okookom',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 when transaction does not exist', (done) => {
    server.put('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 20,
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 200 when viewing all transactions', (done) => {
    server.get('/api/v1/transactions').set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 200 when viewing all confirmed transactions', (done) => {
    server.get('/api/v1/transactions?confirmed=true').set('x-access-token',
      adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 200 when viewing all unconfirmed transactions', (done) => {
    server.get('/api/v1/transactions?confirmed=false')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('should return 202 when surcharge transaction upload is uploaded',
    (done) => {
      server.post('/api/v1/transactions').set('x-access-token', adminToken)
        .send({
          transactionId: 'okookom',
          transactionType: 'surcharge',
          amount: 1000
        })
        .end((err, res) => {
          assert.equal(res.status, 202);
          done();
        });
    });
  it('should return 202 when subscription transaction upload is uploaded',
    (done) => {
      server.post('/api/v1/transactions').set('x-access-token', adminToken)
        .send({
          transactionId: 'okookom',
          transactionType: 'subscription',
          amount: 1000
        })
        .end((err, res) => {
          assert.equal(res.status, 202);
          done();
        });
    });
  it('should return 400 when transactionId is null', (done) => {
    server.post('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionType: 'surcharge',
        amount: 1000
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 200 when transaction type is null', (done) => {
    server.post('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 'okookom',
        amount: 1000
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 when amount is null', (done) => {
    server.post('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 'okookom',
        transactionType: 'surcharge'
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 200 when transaction is confirmed', (done) => {
    server.put('/api/v1/transactions').set('x-access-token', adminToken)
      .send({
        transactionId: 1,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 409 when transaction has already been confirmed',
    (done) => {
      server.put('/api/v1/transactions').set('x-access-token', adminToken)
        .send({
          transactionId: 1,
        })
        .end((err, res) => {
          assert.equal(res.status, 409);
          done();
        });
    });
});
