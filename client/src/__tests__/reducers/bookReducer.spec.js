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

describe('book reducer', () => {
  test('should return initial state when there is no action', () => {
    expect(bookReducer(state, {})).toEqual(state);
  });

  test('should return book to state when action type is ADD_BOOK', () => {
    action.type = ADD_BOOK;
    expect(bookReducer(state, action)).toEqual({ books: [action.book] });
  });

  test('should return an error when action type is BOOK_ERROR', () => {
    action.type = BOOK_ERROR;
    expect(bookReducer(state, action).error).toEqual(action.payload);
  });

  test('should return a search error when action type is SEARCH_ERROR',
    () => {
      action.type = SEARCH_ERROR;
      expect(bookReducer(state, action).searchError).toEqual(action.payload);
    });

  test('should return a book when action type is GET_ABOOK', () => {
    action.type = GET_ABOOK;
    action.payload = action.book;
    expect(bookReducer(state, action).book).toEqual(action.book);
  });

  test('should return state when action type is BORROW_BOOK', () => {
    action.type = BORROW_BOOK;
    expect(bookReducer(state, action)).toEqual(state);
  });

  test('should return state when action type is RETURN_BOOK', () => {
    action.type = RETURN_BOOK;
    expect(bookReducer(state, action)).toEqual(state);
  });

  test('should clear error in state when action type is CLEAR_ERROR', () => {
    action.type = CLEAR_ERROR;
    expect(bookReducer(state, action).error).toEqual('');
  });

  test('should clear search error when action type is CLEAR_SEARCH_ERROR',
    () => {
      action.type = CLEAR_SEARCH_ERROR;
      expect(bookReducer(state, action).searchError).toEqual('');
    });

  test('should return all books when action type is GET_BOOKS', () => {
    action.type = GET_BOOKS;
    action.payload = [{
      id: 1,
      title: 'a title'
    }, {
      id: 2,
      title: 'some title'
    }];
    expect(bookReducer(state, action).books).toEqual(action.payload);
  });

  test('should remove book from state when action type is DELETE_BOOK', () => {
    action.type = DELETE_BOOK;
    state.books.books = action.payload;
    action.payload = 1;
    const books = [{ id: 2, title: 'some title' }];
    expect(bookReducer(state, action)).toEqual({ books });
  });

  test('should return modified book when action type is MODIFY_BOOK', () => {
    action.type = MODIFY_BOOK;
    const modifiedBooks = [{
      id: 2,
      title: 'some title'
    }, {
      id: 1,
      title: 'a title'
    }];
    expect(bookReducer(state, action).books).toEqual(modifiedBooks);
  });

  test('should return books in a category when action type is' +
    ' GET_BOOKS_BYCATEGORIES', () => {
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

