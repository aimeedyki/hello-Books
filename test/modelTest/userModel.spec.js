import { assert } from 'chai';
import faker from 'faker';
import bcrypt from 'bcrypt';
import { User, Level } from '../../server/models';

describe('User model', () => {
  it('should create a user instance', (done) => {
    User.create({
      username: 'username',
      password: 'password',
      email: 'email@gmail.com',
      name: 'name'
    })
      .then((user) => {
        assert.typeOf(user.id, 'number');
        assert.equal(user.username, 'username');
        assert.equal(user.email, 'email@gmail.com');
        assert.equal(user.name, 'name');
        done();
      }).catch(err => done(err));
  });

  it('should create a user as an instance of User model', (done) => {
    User.create({
      username: 'user2',
      password: 'testpassword',
      email: 'email2@gmail.com',
      name: 'name2'
    })
      .then((user) => {
        assert.equal(user instanceof User, true);
        done();
      }).catch(err => done(err));
  });

  it('should hash passwords before they are stored', (done) => {
    User.create({
      username: 'user3',
      password: 'testpassword3',
      email: 'email3@gmail.com',
      name: 'name3'
    })
      .then((user) => {
        assert.notEqual(user.password, 'testpassword3');
        done();
      }).catch(err => done(err));
  });

  it('should be able to check that password is same', (done) => {
    User.create({
      username: 'user4',
      password: 'password',
      email: 'email4@gmail.com',
      name: 'name'
    })
      .then((user) => {
        assert.equal(bcrypt.compareSync('password', user.password), true);
        done();
      }).catch(err => done(err));
  });
});
