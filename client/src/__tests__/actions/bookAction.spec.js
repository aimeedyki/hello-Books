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
  term: 'hey',
  limit: 8,
  offset: 0
};
const pagination = jest.fn();
const refresh = jest.fn();

describe('addBook action creator', () => {
  test(`should dispatch an action type ADD_BOOK
  when it successfully adds a book to library`, () => {
      const store = mockStore({ book: {} });
      mock.onPost().replyOnce(201, {
        book: details.book
      });
      const expectedActions = [{
        type: ADD_BOOK,
        book: details.book
      }];
      store.dispatch(addBook({ ...details.book }))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedActions);
          expect(actions[0].type).toBe(ADD_BOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, { message: details.error });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(addBook('a title', undefined))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('modifyBook action creator', () => {
  test(`should dispatch an action type MODIFY_BOOK 
  when it successfully modifies a book in the library`, () => {
      const store = mockStore({});
      mock.onPut().replyOnce(200, {
        updatedBook: details.book
      });
      const expectedAction = [{
        type: MODIFY_BOOK,
        book: details.book
      }];
      store.dispatch(modifyBook(details.book))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(MODIFY_BOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onPut().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(modifyBook('a title', undefined))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('addNewCategory action creator', () => {
  const store = mockStore({});
  test(`should dispatch an action type ADD_CATEGORY 
  when successfully adds a new category`, () => {
      mock.onPost().replyOnce(201,
        { categories: details.category }
      );
      const expectedAction = [{
        type: ADD_CATEGORY,
        category: details.category
      }];
      store.dispatch(addNewCategory(details.category.name))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(ADD_CATEGORY);
        });
    });
});

describe('getCategories action creator', () => {
  test(`should dispatch an action type GET_CATEGORIES 
  when it successfully fetches book categories`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        categories: details.category
      });

      const expectedAction = [{
        type: GET_CATEGORIES,
        payload: details.category
      }];

      store.dispatch(getCategories())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_CATEGORIES);
        });
    });
});

describe('editCategory action creator', () => {
  test(`should dispatch an action type EDIT_CATEGORY 
  when it successfully edits a category name`, () => {
      const store = mockStore({});
      details.category = { name: 'edited category', id: 1 };
      mock.onPut().replyOnce(200,
        { updatedCategory: details.category }
      );
      const expectedAction = [{
        type: EDIT_CATEGORY,
        category: details.category
      }];
      store.dispatch(editCategory(details.category.name))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(EDIT_CATEGORY);
        });
    });
});

describe('deleteCategory action creator', () => {
  test(`should dispatch an action type DELETE_CATEGORY 
  when successfully edits a category name`, () => {
      const store = mockStore({});
      mock.onDelete().replyOnce(200,
        {});
      const expectedAction = [{
        type: DELETE_CATEGORY,
        payload: details.category.id
      }];
      store.dispatch(deleteCategory(details.category.id))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DELETE_CATEGORY);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onPut().replyOnce(400, {
        message: details.error
      });
      const expectedAction = {
        type: BOOK_ERROR,
        payload: details.error
      };
      store.dispatch(deleteCategory('1'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toBe(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('getBooks action creator', () => {
  test(`should dispatch an action type GET_BOOKS
   successfully gets books`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        allBooks: details.book
      });
      const expectedAction = [{
        type: GET_BOOKS,
        payload: details.book
      }];
      store.dispatch(getBooks(details.limit, details.offset, pagination))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_BOOKS);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(getBooks())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('getABook action creator', () => {
  test(`should dispatch an action type GET_ABOOK 
  when it successfully fetches a book`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200,
        { book: details.book }
      );
      const expectedAction = [{
        type: GET_ABOOK,
        payload: details.book
      }];
      store.dispatch(getABook(details.book.id))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_ABOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(getABook('1'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('getBooksByCategory action creator', () => {
  test(`should dispatch an action type GET_BOOKS_BYCATEGORIES 
  when it successfully gets books in a category`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, details.book);
      const expectedAction = [{
        type: GET_BOOKS_BYCATEGORIES,
        payload: details.book
      }];
      store.dispatch(getBooksByCategory())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_BOOKS_BYCATEGORIES);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when ther is an error`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(getBooksByCategory())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('borrowBook action creator', () => {
  test(`should dispatch an action type BORROW_BOOK 
  when it successfully borrows a book`, () => {
      const store = mockStore({});
      mock.onPost().replyOnce(201,
        details.book
      );
      const expectedAction = [{
        type: BORROW_BOOK
      }];
      store.dispatch(borrowBook(details.book.id, refresh))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BORROW_BOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(borrowBook('1'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('deleteBook action creator', () => {
  test(`should dispatch an action type DELETE_BOOK 
  when it successfully deletes a book`, () => {
      const store = mockStore({});
      mock.onDelete().replyOnce(200,
        {}
      );
      const expectedAction = [{
        type: DELETE_BOOK,
        payload: details.book.id
      }];
      store.dispatch(deleteBook(details.book.id, refresh))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DELETE_BOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onDelete().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(deleteBook('1'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('returnBook action creator', () => {
  test(`should dispatch an action type RETURN_BOOK 
  when it successfully returns a book`, () => {
      const store = mockStore({});
      mock.restore();
      mock.onPut().replyOnce(200,
        {}
      );
      const expectedAction = [{
        type: RETURN_BOOK
      }];
      store.dispatch(returnBook(details.historyId, refresh))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(RETURN_BOOK);
        });
    });
  test(`should dispatch an action type BOOK_ERROR 
  when details are invalid`, () => {
      const store = mockStore({});
      mock.onPut().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: BOOK_ERROR,
        payload: details.error
      }];
      store.dispatch(returnBook('1'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(BOOK_ERROR);
        });
    });
});

describe('searchBooks action creator', () => {
  test(`should dispatch an action type GET_BOOKS 
  when it returns books searched`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        foundBooks: details.book
      });
      const expectedAction = [{
        type: GET_BOOKS,
        payload: details.book
      }];
      store.dispatch(searchBooks(details.term, pagination))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toBe(expectedAction);
          expect(actions[0].type).toBe(SEARCH_BOOKS);
        });
    });
  test(`should dispatch an action type SEARCH_ERROR 
  if there is a search error`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = {
        type: SEARCH_ERROR,
        payload: details.error
      };
      store.dispatch(searchBooks('a'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toBe(expectedAction);
          expect(actions[0].type).toBe(SEARCH_ERROR);
        });
    });
});

describe('searchCategories action creator', () => {
  test(`should dispatch an action type GET_BOOKS_BYCATEGORIES
  when it successfully returns books searched`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        foundBooks: details.book
      });
      const expectedAction = [{
        type: GET_BOOKS_BYCATEGORIES,
        payload: { details }
      }];
      store.dispatch(searchCategory(
        details.category.id, details.term, pagination))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_BOOKS_BYCATEGORIES);
        });
    });
  test(`should dispatch an action type SEARCH_ERROR 
  if there is a search error`, () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: SEARCH_ERROR,
        payload: details.error
      }];
      store.dispatch(searchCategory('a'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(SEARCH_ERROR);
        });
    });
});
