import axios from 'axios';
import {
  ADD_BOOK,
  ADD_CATEGORY,
  GET_CATEGORIES,
  BOOK_ERROR,
  MODIFY_BOOK,
  GET_BOOKS,
  GET_BOOKS_BYCATEGORIES
} from './types';
import { errorHandler } from './authAction'

const API_URL = 'http://localhost:5000/api/v1';

export const setCategories = (categories) => {

  return {
    type: GET_CATEGORIES,
    payload: categories
  }
}

export const setBooks = (books) => {
  return {
    type: GET_BOOKS,
    payload: books
  }
}
export const setBookCategory = (category) => {
  return {
    type: GET_BOOKS_BYCATEGORIES,
    payload: category
  }
}


export const addBook = ({ title, author, description, quantity, categoryId }) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/books`, { title, author, description, quantity, categoryId })
      .then(response => {
        Materialize.toast('Book added Successfully!', 4000)
        dispatch({
          type: ADD_BOOK,
          book: response.data.book
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const modifyBook = ({ title, author, description, quantity, categoryId }) => {
  return (dispatch) => {
    return axios.put(`${API_URL}/books`, { title, author, description, quantity, categoryId })
      .then(response => {
        Materialize.toast('Book information has been modified!', 4000)
        dispatch({
          type: MODIFY_BOOK,
          book: response.data.book
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const addNewCategory = ({ category }) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/category`, { category })
      .then(response => {
        Materialize.toast('Category added Successfully!', 4000)
        dispatch({
          type: ADD_CATEGORY,
          category: response.data.category
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const getCategories = () => {
  return (dispatch) => {
    return axios.get(`${API_URL}/category`)
      .then(response => {
        dispatch(setCategories(response.data.categories));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const getBooks = () => {
  return (dispatch) => {
    return axios.get(`${API_URL}/books`)
      .then(response => {
        dispatch(setBooks(response.data.books));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const getBooksByCategory = (id) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/category/${id}`)
      .then(response => {
        console.log('response is', response.data)
        dispatch(setBookCategory(response.data.category));
      })
      .catch((error) => {
        console.log('action error', error);
      });
  }
}
