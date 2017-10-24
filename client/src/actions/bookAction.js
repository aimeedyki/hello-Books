import axios from 'axios';
import request from 'superagent';
import {
  ADD_BOOK,
  ADD_CATEGORY,
  GET_CATEGORIES,
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
  GET_PAGINATION
} from './types';
import { errorHandler, clearErrorMessage } from './authAction';

const API_URL = 'http://localhost:5000/api/v1';

/* eslint-disable no-undef */
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
export const setaBook = book => ({
  type: GET_ABOOK,
  payload: book
});

// action to set all the books in a category to store
export const setBookCategory = category => ({
  type: GET_BOOKS_BYCATEGORIES,
  payload: category
});

// action to set pagination
export const setPagination = pagination => ({
  type: GET_PAGINATION,
  payload: pagination
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
      axios.post(`${API_URL}/books`,
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

// action creator to modify a book
export const modifyBook =
  ({ title, author, description, quantity, categoryId, bookId }) => (
    dispatch => (
      axios.put(`${API_URL}/books/${bookId}`,
        { title, author, description, quantity, categoryId })
        .then((response) => {
          Materialize.toast('Book information has been modified!', 4000);
          dispatch({
            type: MODIFY_BOOK,
            book: response.data.book
          });
          return true;
        })
        .catch((error) => {
          errorHandler(dispatch, error.response, BOOK_ERROR);
        })
    )
  );

// action creator to add a new book category
export const addNewCategory = ({ name }) => (
  dispatch => (
    axios.post(`${API_URL}/category`, { name })
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY,
          category: response.data.category
        });
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000, '', () => {
          clearErrorMessage();
        });
      })
  )
);

// action creator to get all categories
export const getCategories = () => (
  dispatch => (
    axios.get(`${API_URL}/category`)
      .then((response) => {
        dispatch(setCategories(response.data.categories));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to get all books in a library
export const getBooks = (limit, offset) => (
  dispatch => (
    axios.get(`${API_URL}/books?offset=${offset}&limit=${limit}`)
      .then((response) => {
        dispatch(setBooks(response.data.books));
        dispatch(setPagination(response.data.pagination));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to get a single book
export const getaBook = id => (
  dispatch => (
    axios.get(`${API_URL}/books/${id}`)
      .then((response) => {
        dispatch(setaBook(response.data.book));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to get the books in a category
export const getBooksByCategory = id => (
  dispatch => (
    axios.get(`${API_URL}/category/${id}`)
      .then((response) => {
        dispatch(setBookCategory(response.data.category));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to delete a book
export const deleteBook = (id, refresh) => (
  dispatch => (
    axios.delete(`${API_URL}/books/${id}`)
      .then(() => {
        refresh();
        dispatch({
          type: DELETE_BOOK
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to borrow a book
export const borrowBook = (bookId, userId, refresh) => (
  dispatch => (
    axios.post(`${API_URL}/users/${userId}/books`, { bookId })
      .then(() => {
        refresh();
        dispatch({
          type: BORROW_BOOK
        });
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000, '', () => {
          clearErrorMessage();
        });
      })
  )
);

// action creator to return a book
export const returnBook = (historyId, userId, refresh) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}/books`, { historyId })
      .then(() => {
        refresh();
        dispatch({
          type: RETURN_BOOK
        });
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000, '', () => {
          clearErrorMessage();
        });
      })
  )
);
