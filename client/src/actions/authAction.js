import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  
} from './types';

const API_URL = 'http://localhost:5000/api/v1';

export const clearErrorMessage = () => {
  return {
    type: CLEAR_ERROR
  };
}

export const errorHandler = (dispatch, error, type) => {
  let errorMessage = error.data.message
  
  if (error.status === 403) {
    dispatch({
      type: type,
      payload: 'Oops! you have strayed far from home... Please login to enjoy the Booksville experience.'
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export const signupUser = ({ email, username, password, level }) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/signup`, { email, username, password, level })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        Materialize.toast('Signup successful! Welcome to Booksville', 5000)
        dispatch({ type: AUTH_USER });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export const signinUser = ({ username, password }) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/signin`, { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        Materialize.toast('Welcome back to Booksville!!', 5000)
        dispatch({ type: AUTH_USER });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
