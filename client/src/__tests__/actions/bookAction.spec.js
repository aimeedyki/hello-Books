import axios from 'axios';
import {
  mock, mockStore
} from '../../__mocks__/mockConfig';
import {
  ADD_BOOK,
  ADD_CATEGORY,
  GET_CATEGORIES,
  BOOK_ERROR,
  MODIFY_BOOK,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  GET_BOOKS,
  GET_BOOKS_BYCATEGORIES,
  DELETE_BOOK,
  GET_ABOOK,
  BORROW_BOOK,
  RETURN_BOOK,
  CLOUDINARY_URL,
  CLOUDINARY_PRESET,
  SEARCH_BOOKS,
  SEARCH_ERROR,
  CLEAR_SEARCH_ERROR
} from '../../actions/types';
import {
  addBook, modifyBook, addNewCategory, getCategories, editCategory,
  deleteCategory, getBooks, getABook, getBooksByCategory, deleteBook,
  borrowBook, returnBook, searchBooks, searchCategory
} from '../../actions/bookAction';

const store = mockStore({ book: {} });
const details = {
  book: {
    id: 1,
    title: 'a title',
    author: 'an author',
    description: 'description',
    quantity: 10,
    categoryId: 1,
    image: 'image.jpg'
  },
  error: 'this is an error',
  category: { name: 'a category', id: 1 },
  historyId: 1,
  term: 'hey'
};
const pagination = jest.fn();
const refresh = jest.fn();
describe('addBook action creator', () => {
  test('successfully adds a book to library', () => {
    mock.onPost().replyOnce(201, {
      details
    });
    const expectedAction = {
      type: ADD_BOOK,
      book: details.book
    };
    store.dispatch(addBook(details.book))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ADD_BOOK);
      });
  });
  test('should return an error when book details are invalid', () => {
    mock.onPost().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(addBook('a title', undefined))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('modifyBook action creator', () => {
  test('successfully modifies a book to library', () => {
    mock.onPut().replyOnce(200, {
      details
    });
    const expectedAction = {
      type: MODIFY_BOOK,
      book: details.book
    };
    store.dispatch(modifyBook(details.book))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MODIFY_BOOK);
      });
  });
  test('should return an error when book details are invalid', () => {
    mock.onPut().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(modifyBook('a title', undefined))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('addNewCategory action creator', () => {
  test('successfully adds a new category', () => {
    mock.onPost().replyOnce(201,
      details.category
    );
    const expectedAction = {
      type: ADD_CATEGORY,
      book: details.category
    };
    store.dispatch(addNewCategory(details.category.name))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ADD_CATEGORY);
      });
  });
  test('should return an error when book details are invalid', () => {
    mock.onPost().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(addNewCategory(123))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});
describe('getCategories action creator', () => {
  test('successfully gets book categories',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });

      const expectedAction = {
        type: GET_CATEGORIES,
        payload: { details }
      };

      store.dispatch(getCategories())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(GET_CATEGORIES);
        });
    });
});

describe('editCategory action creator', () => {
  test('successfully edits a category name', () => {
    mock.onPut().replyOnce(200,
      details.category
    );
    const expectedAction = {
      type: EDIT_CATEGORY,
      book: details.category
    };
    store.dispatch(editCategory(details.category.name))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(EDIT_CATEGORY);
      });
  });
  test('should return an error when category details are invalid', () => {
    mock.onPut().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(editCategory(123))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('deleteCategory action creator', () => {
  test('successfully edits a category name', () => {
    mock.onDelete().replyOnce(200,
      details.category
    );
    const expectedAction = {
      type: DELETE_CATEGORY,
      book: details.category
    };
    store.dispatch(deleteCategory(details.category.id))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(DELETE_CATEGORY);
      });
  });
  test('should return an error when category details are invalid', () => {
    mock.onPut().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(deleteCategory('1'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('getBooks action creator', () => {
  test('successfully gets books', () => {
    mock.onGet().replyOnce(200, {
      details
    });

    const expectedAction = {
      type: GET_BOOKS,
      payload: { details }
    };
    store.dispatch(getBooks())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_BOOKS);
      });
  });
  test('should return an error if request is invalid', () => {
    mock.onGet().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(getBooks())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('getABook action creator', () => {
  test('successfully gets a book', () => {
    mock.onGet().replyOnce(200,
      details.book
    );
    const expectedAction = {
      type: GET_ABOOK,
      book: details.book
    };
    store.dispatch(getABook(details.book.id))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_ABOOK);
      });
  });
  test('should return an error when id is wrong', () => {
    mock.onGet().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(getABook('1'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('getBooksByCategory action creator', () => {
  test('successfully gets books', () => {
    mock.onGet().replyOnce(200, {
      details
    });
    const expectedAction = {
      type: GET_BOOKS_BYCATEGORIES,
      payload: { details }
    };
    store.dispatch(getBooksByCategory())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_BOOKS_BYCATEGORIES);
      });
  });
  test('should return an error if request is invalid', () => {
    mock.onGet().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(getBooksByCategory())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('borrowBook action creator', () => {
  test('successfully borrow a book', () => {
    mock.onPost().replyOnce(201,
      details.book
    );
    const expectedAction = {
      type: BORROW_BOOK
    };
    store.dispatch(borrowBook(details.book.id, refresh))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BORROW_BOOK);
      });
  });
  test('should return an error when book details are invalid', () => {
    mock.onPost().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(borrowBook('1'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('deleteBook action creator', () => {
  test('successfully delete a book', () => {
    mock.onDelete().replyOnce(200,
      details.category
    );
    const expectedAction = {
      type: DELETE_BOOK
    };
    store.dispatch(deleteBook(details.book.id, refresh))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(DELETE_BOOK);
      });
  });
  test('should return an error when book details are invalid', () => {
    mock.onDelete().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(deleteBook('1'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('returnBook action creator', () => {
  test('successfully return a book', () => {
    mock.onPut().replyOnce(200,
      { details }
    );
    const expectedAction = {
      type: RETURN_BOOK
    };
    store.dispatch(returnBook(details.historyId, refresh))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(RETURN_BOOK);
      });
  });
  test('should return an error when details are invalid', () => {
    mock.onPut().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: BOOK_ERROR,
      payload: details.error
    };
    store.dispatch(returnBook('1'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(BOOK_ERROR);
      });
  });
});

describe('searchBooks action creator', () => {
  test('successfully returns books searched', () => {
    mock.onGet().replyOnce(200, {
      details
    });
    const expectedAction = {
      type: SEARCH_BOOKS,
      payload: { details }
    };
    store.dispatch(searchBooks(details.term, pagination))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(SEARCH_BOOKS);
      });
  });
  test('should return an error if request is invalid', () => {
    mock.onGet().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: SEARCH_ERROR,
      payload: details.error
    };
    store.dispatch(searchBooks('a'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(SEARCH_ERROR);
      });
  });
});

describe('searchCategories action creator', () => {
  test('successfully returns books searched', () => {
    mock.onGet().replyOnce(200, {
      details
    });
    const expectedAction = {
      type: GET_BOOKS_BYCATEGORIES,
      payload: { details }
    };
    store.dispatch(searchCategory(
      details.category.id, details.term, pagination))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_BOOKS_BYCATEGORIES);
      });
  });
  test('should return an error if request is invalid', () => {
    mock.onGet().replyOnce(400, {
      details
    });
    const expectedAction = {
      type: SEARCH_ERROR,
      payload: details.error
    };
    store.dispatch(searchCategory('a'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(SEARCH_ERROR);
      });
  });
});
