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

// action to set the book categories to the redux store
export const setCategories = categories => ({
  type: GET_CATEGORIES,
  payload: categories
});

// action to set all books from api to the store
export const setBooks = books => ({
  type: GET_BOOKS,
  payload: books
});

// action to get a particular book
export const setABook = book => ({
  type: GET_ABOOK,
  payload: book
});

// action to set all the books in a category to store
export const setBookCategory = category => ({
  type: GET_BOOKS_BYCATEGORIES,
  payload: category
});

/**
 * @description clears error message in store
 * @return {*} null
 */
export const clearSearchError = () => ({
  type: CLEAR_SEARCH_ERROR
});

// action to upload an image to cloudinary
export const imageUpload = image => (
  () => (
    request
      .post(CLOUDINARY_URL)
      .field('upload_preset', CLOUDINARY_PRESET)
      .field('file', image)
  )
);

// action creator to add a book
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
// action creator to get all books in a library
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

// action creator to modify a book
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

// action creator to get all categories
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

// action creator to add a new book category
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

// action creator to add a new book category
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

// action creator to delete a category
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

// action creator to get a single book
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

// action creator to get the books in a category
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

// action creator to delete a book
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

// action creator to borrow a book
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

// action creator to return a book
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

// action creator to search a book
export const searchBooks = (term, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/search?term=${term}`)
      .then((response) => {
        dispatch(setBooks(response.data.foundBooks));
        paginationFunction();
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, SEARCH_ERROR);
      })
  )
);

// action creator to search a book category
export const searchCategory = (term, categoryId, paginationFunction) => (
  dispatch => (
    axios.get(`/api/v1/search?term=${term}&category=${categoryId}`)
      .then((response) => {
        dispatch(setBookCategory(response.data.foundBooks));
        paginationFunction();
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, SEARCH_ERROR);
      })
  )
);
