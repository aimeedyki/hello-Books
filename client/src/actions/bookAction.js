import axios from 'axios';
import request from 'superagent';
import {
  ADD_BOOK,
  ADD_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  BOOK_ERROR,
  MODIFY_BOOK,
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
} from './types';
import { errorHandler } from './authAction';

/** @description sets the book categories to the redux store
 * 
 * @param {arrays} categories categories in the library
 *
 * @return {Object} with a type as string and an array of categories
 */
export const setCategories = categories => ({
  type: GET_CATEGORIES,
  payload: categories
});

/** @description sets all books to the redux store
 * 
 * @param {arrays} books books in the library
 *
 * @return {Object} with a type as string and an array of books
 */
export const setBooks = books => ({
  type: GET_BOOKS,
  payload: books
});

/** @description sets a single book
 * 
 * @param {object} book a single book
 *
 * @return {Object} with a type as string and a book object
 */
export const setABook = book => ({
  type: GET_ABOOK,
  payload: book
});

/** @description sets books in a category to store
 *
 * @param {arrays} category the books in a category
 *
 * @return {Object} with a type as string and a category object
 */
export const setBookCategory = category => ({
  type: GET_BOOKS_BYCATEGORIES,
  payload: category
});

/** @description clears error message in store
 *
 * @return {Object} with a type as string
 */
export const clearSearchError = () => ({
  type: CLEAR_SEARCH_ERROR
});

/** @description uploads an image to cloudinary
 *
 * @param {file} image an image file
 *
 * @return {*} null
 */
export const imageUpload = image => (
  () => (
    request
      .post(CLOUDINARY_URL)
      .field('upload_preset', CLOUDINARY_PRESET)
      .field('file', image)
  )
);

/** @description action creator to add a book
 *
 * @param {string} title book title
 * @param {string} author book author
 * @param {string} description book description
 * @param {number} quantity book quantity
 * @param {number} categoryId category book belongs to
 * @param {string} image book image url
 *
 * @return {function} dispatch
 */
export const addBook =
  ({ title, author, description, quantity, categoryId, image }) => (
    dispatch => (
      axios.post('/api/v1/books',
        { title, author, description, quantity, categoryId, image })
        .then((response) => {
          dispatch({
            type: ADD_BOOK,
            book: response.data.book
          });
          return true;
        })
        .catch((error) => {
          errorHandler(dispatch, error.response, BOOK_ERROR);
        })
    )
  );

/** @description action creator to get all books in a library
 *
 * @param {number} limit The maximum number of items to display
 * @param {number} offset The offset from the first result to list from
 * @param {function} paginationFunction function that displays pagination
 *
 * @return {function} dispatch
 */
export const getBooks = (limit, offset, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/books?offset=${offset}&limit=${limit}`)
      .then((response) => {
        dispatch(setBooks(response.data.allBooks));
        if (paginationFunction) {
          paginationFunction();
        }
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to modify a book
 *
 * @param {string} title book title
 * @param {string} author book author
 * @param {string} description book description
 * @param {number} quantity book quantity
 * @param {number} categoryId category book belongs to
 * @param {string} image book image url
 *
 * @return {function} dispatch
 */
export const modifyBook =
  ({ title, author, description, quantity, categoryId, bookId, image }) => (
    dispatch => (
      axios.put(`/api/v1/books/${bookId}`,
        { title, author, description, quantity, categoryId, image })
        .then((response) => {
          dispatch({
            type: MODIFY_BOOK,
            book: response.data.updatedBook
          });
          return true;
        })
        .catch((error) => {
          errorHandler(dispatch, error.response, BOOK_ERROR);
        })
    )
  );

// 
/** @description action creator to get all categories
 *
 * @return {function} dispatch
 */
export const getCategories = () => (
  dispatch => (
    axios.get('/api/v1/category')
      .then((response) => {
        dispatch(setCategories(response.data.categories));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to add a new book category
 *
 * @param {string} name category name
 *
 * @return {function} dispatch
 */
export const addNewCategory = ({ name }) => (
  dispatch => (
    axios.post('/api/v1/category', { name })
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY,
          category: response.data.categories
        });
        dispatch(getCategories());
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000,
          'indigo darken-2');
      })
  )
);

/** @description action creator to edit a category name
 *
 * @param {number} categoryId id of the category to be edited
 * @param {string} name category name
 *
 * @return {function} dispatch
 */
export const editCategory = (categoryId, name) => (
  dispatch => (
    axios.put(`/api/v1/${categoryId}/category`, { name })
      .then((response) => {
        dispatch({
          type: EDIT_CATEGORY,
          category: response.data.updatedCategory
        });
        getCategories();
        Materialize.toast(`Category name has been edited to ${name}`, 4000,
          'indigo darken-2');
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000,
          'indigo darken-2');
      })
  )
);

/** @description action creator to delete a category
 *
 * @param {number} id id of the category to be deleted
 *
 * @return {function} dispatch
 */
export const deleteCategory = id => (
  dispatch => (
    axios.delete(`/api/v1/${id}/category`)
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY,
          payload: id
        });
        dispatch(getCategories());
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to get a single book
 *
 * @param {number} id id of the book to be displayed
 *
 * @return {function} dispatch
 */
export const getABook = id => (
  dispatch => (
    axios.get(`/api/v1/books/${id}`)
      .then((response) => {
        dispatch(setABook(response.data.book));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to get the books in a category
 *
 * @param {number} id id of the category to be displayed
 * @param {number} limit The maximum number of items to display
 * @param {number} offset The offset from the first result to list from
 * @param {function} paginationFunction function that displays pagination
 *
 * @return {*} null
 */
export const getBooksByCategory = (id, limit, offset, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/${id}/category?offset=${offset}
    &limit=${limit}`)
      .then((response) => {
        dispatch(setBookCategory(response.data));
        paginationFunction();
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to delete a book
 *
 * @param {number} id id of the book to be borrowed
 * @param {function} refresh a function to refresh the page
 *
 * @return {*} null
 */
export const deleteBook = (id, refresh) => (
  dispatch => (
    axios.delete(`/api/v1/books/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_BOOK,
          payload: id
        });
        refresh();
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to borrow a book
 *
 * @param {number} bookId id of the book to be borrowed
 *  @param {function} refresh a function to refresh the page
 *
 * @return {*} null
 */
export const borrowBook = (bookId, refresh) => (
  dispatch => (
    axios.post('/api/v1/user/borrow-book',
      { bookId })
      .then(() => {
        dispatch({
          type: BORROW_BOOK
        });
        refresh();
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to return a book
 *
 * @param {number} historyId the id of the history record
 * @param {function} refresh a function to refresh the page
 *
 * @return {*} null
 */
export const returnBook = (historyId, refresh) => (
  dispatch => (
    axios.put('/api/v1/user/return-book',
      { historyId })
      .then(() => {
        dispatch({
          type: RETURN_BOOK
        });
        refresh();
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

/** @description action creator to search for a book
 *
 * @param {string} term search term
 * @param {function} paginationFunction function that displays pagination
 *
 * @return {*} null
 */
export const searchBooks = (term, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/search?term=${term}`)
      .then((response) => {
        if (response.data.message !== 'Success') {
          dispatch({
            type: SEARCH_ERROR,
            payload: response.data.message
          });
        } else {
          dispatch(setBooks(response.data.foundBooks));
          paginationFunction();
        }
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, SEARCH_ERROR);
      })
  )
);

/** @description action creator to search a book category
 *
 * @param {string} term search term
 * @param {number} categoryId the category the books belong to
 * @param {function} paginationFunction function that displays pagination
 *
 * @return {*} null
 */
export const searchCategory = (term, categoryId, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/search?term=${term}&category=${categoryId}`)
      .then((response) => {
        if (response.data.message !== 'Success') {
          dispatch({
            type: SEARCH_ERROR,
            payload: response.data.message
          });
        } else {
          dispatch(setBookCategory(response.data.foundBooks));
          paginationFunction();
        }
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, SEARCH_ERROR);
      })
  )
);
