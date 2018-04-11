import { assert } from 'chai';
import { History } from '../../server/models';

describe('History model', () => {
  it('should create an instance of history', (done) => {
    History.create({
      expectedDate: new Date(),
      returnedDate: new Date(),
      returned: false,
      userId: 1,
      userLevel: 'rookie',
      bookId: 1
    })
      .then((history) => {
        assert.typeOf(history.id, 'number');
        assert.equal(history.returned, false);
        assert.equal(history.userId, 1);
        assert.equal(history.userLevel, 'rookie');
        assert.equal(history.bookId, 1);
        done();
      }).catch(err => done(err));
  });
  it('should create a history as an instance of History model', (done) => {
    History.create({
      expectedDate: new Date(),
      returnedDate: new Date(),
      returned: false,
      userId: 1,
      userLevel: 'rookie',
      bookId: 1
    })
      .then((history) => {
        assert.equal(history instanceof History, true);
        done();
      }).catch(err => done(err));
  });
});
