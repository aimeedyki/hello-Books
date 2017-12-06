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

const initialState = {
  error: '',
  searchError: '',
  books: [],
  bookCategory: {},
  editedbook: {},
  book: {},
  pagination: {}
};
/** reducers for book components
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns {*} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.book]
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case MODIFY_BOOK:
      return {
        ...state,
        books: [...state.books.books.filter(book =>
          book.id !== action.book.id), action.book]
      };
    case SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_BOOKS_BYCATEGORIES:
      return {
        ...state,
        bookCategory: action.payload,
      };
    case GET_ABOOK:
      return {
        ...state,
        book: action.payload,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: [...state.books.books.filter(book => book.id !== action.payload)]
      };
    case BORROW_BOOK:
      return {
        ...state
      };
    case RETURN_BOOK:
      return {
        ...state
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAR_SEARCH_ERROR:
      return {
        ...state,
        searchError: ''
      };
    default:
      return state;
  }
};
