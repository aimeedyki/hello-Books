import {
  BOOK_ERROR,
  ADD_BOOK,
  MODIFY_BOOK,
  GET_BOOKS,
  GET_BOOKS_BYCATEGORIES,
  GET_ABOOK,
  BORROW_BOOK,
  RETURN_BOOK,
  CLEAR_ERROR,
  SEARCH_ERROR,
  CLEAR_SEARCH_ERROR,
  DELETE_BOOK
} from '../../actions/types';
import bookReducer from '../../reducers/book/bookReducer';

describe('book reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      payload: 'an error',
      book: {
        id: 1,
        title: 'a title'
      }
    };

    const state = {
      books: { books: [] }
    };
    action.type = ADD_BOOK;
    expect(bookReducer(state, action)).toEqual({ books: [action.book] });

    action.type = BOOK_ERROR;
    expect(bookReducer(state, action).error).toEqual(action.payload);

    action.type = SEARCH_ERROR;
    expect(bookReducer(state, action).searchError).toEqual(action.payload);

    action.type = GET_ABOOK;
    action.payload = action.book;
    expect(bookReducer(state, action).book).toEqual(action.book);

    action.type = BORROW_BOOK;
    expect(bookReducer(state, action)).toEqual(state);

    action.type = RETURN_BOOK;
    expect(bookReducer(state, action)).toEqual(state);

    action.type = CLEAR_ERROR;
    expect(bookReducer(state, action).error).toEqual('');

    action.type = CLEAR_SEARCH_ERROR;
    expect(bookReducer(state, action).searchError).toEqual('');

    action.type = GET_BOOKS;
    action.payload = [{
      id: 1,
      title: 'a title'
    }, {
      id: 2,
      title: 'some title'
    }];
    expect(bookReducer(state, action).books).toEqual(action.payload);

    action.type = DELETE_BOOK;
    state.books.books = action.payload;
    action.payload = 1;
    const books = [{ id: 2, title: 'some title' }];
    expect(bookReducer(state, action)).toEqual({ books });

    action.type = MODIFY_BOOK;
    const modifiedBooks = [{
      id: 2,
      title: 'some title'
    }, {
      id: 1,
      title: 'a title'
    }];
    expect(bookReducer(state, action)).toEqual({ books: modifiedBooks });

    action.type = GET_BOOKS_BYCATEGORIES;
    action.payload = [{
      id: 1,
      title: 'a title'
    }, {
      id: 2,
      title: 'some title'
    }];
    expect(bookReducer(state, action).bookCategory).toEqual(action.payload);
  });
});

