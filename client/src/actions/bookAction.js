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
  CLOUDINARY_PRESET
} from './types';
import { errorHandler } from './authAction';

const API_URL = 'http://localhost:5000/api/v1';

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
export const addNewCategory = ({ category }) => (
  dispatch => (
    axios.post(`${API_URL}/category`, { category })
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY,
          category: response.data.category
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
export const getBooks = () => (
  dispatch => (
    axios.get(`${API_URL}/books`)
      .then((response) => {
        dispatch(setBooks(response.data.books));
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
export const deleteBook = id => (
  dispatch => (
    axios.delete(`${API_URL}/books/${id}`)
      .then(() => {
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
export const borrowBook = (bookId, userId) => (
  dispatch => (
    axios.post(`${API_URL}/users/${userId}/books`, { bookId })
      .then(() => {
        dispatch({
          type: BORROW_BOOK
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);

// action creator to return a book
export const returnBook = (bookId, userId) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}/books`, { bookId })
      .then(() => {
        dispatch({
          type: RETURN_BOOK
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR);
      })
  )
);
