import supertest from 'supertest';
import { assert } from 'chai';

import app from '../../server/app';
import { userToken } from '../helpers/testHooks';

const server = supertest.agent(app);

let token = '';
let adminToken = '';

describe('History', () => {
  before((done) => {
    userToken()
      .then((responseToken) => {
        token = responseToken.token;
        adminToken = responseToken.adminToken;
        done();
      });
  });
  it('should return 201 when a book is borrowed', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', adminToken)
      .send({
        bookId: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 201 when a book is borrowed', (done) => {
    server.post('/api/v1/user/borrow-book').set('x-access-token', adminToken)
      .send({
        bookId: 3,
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.notification);
        done();
      });
  });
  it('should return 400 when a user has surpassed their books for the month',
    (done) => {
      server.post('/api/v1/user/borrow-book').set('x-access-token', adminToken)
        .send({
          bookId: 1,
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.isNotNull(res.body.notification);
          done();
        });
    });
  it('should return 409 when a book to be deleted has been borrowed',
    (done) => {
      server.delete('/api/v1/books/3').set('x-access-token', adminToken)
        .end((err, res) => {
          assert.equal(res.status, 409);
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
        bookId: 5,
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
