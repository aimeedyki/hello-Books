import axios from 'axios';
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
  RETURN_BOOK
  
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

export const setaBook = (book) => {
  return {
    type: GET_ABOOK,
    payload: book
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

export const modifyBook = ({ title, author, description, quantity, categoryId, bookId }) => {
  return (dispatch) => {
    return axios.put(`${API_URL}/books/${bookId}`, { title, author, description, quantity, categoryId })
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

export const getaBook = (id) => {
  
  return (dispatch) => {
    return axios.get(`${API_URL}/books/${id}`)
      .then(response => {
        
        dispatch(setaBook(response.data.book));
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

export const getBooksByCategory = (id) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/category/${id}`)
      .then(response => {
        dispatch(setBookCategory(response.data.category));
      })
      .catch((error) => {
        console.log('action error', error);
      });
  }
}

export const deleteBook = (id) => {
  return (dispatch) => {
    return axios.delete(`${API_URL}/books/${id}`)
      .then(response => {
        Materialize.toast('Book has been deleted!', 4000)
        dispatch({
          type: DELETE_BOOK});
       })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const borrowBook = (bookId, userId) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/${userId}/books`, {bookId})
      .then(response => {
        
        Materialize.toast('Thank you for borrowing!!', 4000)
        dispatch({
          type: BORROW_BOOK});
       })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}

export const returnBook = (bookId, userId) => {
  return (dispatch) => {
    return axios.put(`${API_URL}/users/${userId}/books`, {bookId})
      .then(response => {
        
        Materialize.toast('Book Returned!! Please browse for interesting reads', 4000)
        dispatch({
          type: RETURN_BOOK});
       })
      .catch((error) => {
        errorHandler(dispatch, error.response, BOOK_ERROR)
      });
  }
}
