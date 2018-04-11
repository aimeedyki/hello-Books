import { assert } from 'chai';
import faker from 'faker';

import { Book, Category } from '../../server/models';

describe('Category model', () => {
  it('should create an instance of category', (done) => {
    Category.create({
      name: 'Mystery'
    })
      .then((category) => {
        assert.typeOf(category.id, 'number');
        assert.equal(category.name, 'Mystery');
        done();
      }).catch(err => done(err));
  });
});

describe('Book model', () => {
  it('should create an instance of book', (done) => {
    Book.create({
      title: 'title',
      author: 'author',
      description: 'a description',
      quantity: 1,
      categoryId: 1
    })
      .then((book) => {
        assert.typeOf(book.id, 'number');
        assert.equal(book.author, 'author');
        assert.equal(book.description, 'a description');
        assert.equal(book.quantity, 1);
        assert.equal(book.categoryId, 1);
        done();
      }).catch(err => done(err));
  });

  it('should create a book as an instance of Book model', (done) => {
    Book.create({
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      description: 'a description',
      quantity: 1,
      categoryId: 1
    })
      .then((book) => {
        assert.equal(book instanceof Book, true);
        done();
      }).catch(err => done(err));
  });
});
