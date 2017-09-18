import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER

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
      payload: 'Oops! you have strayed far from home... Please login to get back.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });

  }
}

export const setCurrentUser = (user) => {
  return {
    type: AUTH_USER,
    user
  }
}

export const deleteUser = () => ({
  type: UNAUTH_USER
})

export const signupUser = ({ email, username, password, level }) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/signup`, { email, username, password, level })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
        Materialize.toast('Signup successful! Welcome to Booksville', 5000)
        dispatch(setCurrentUser(response.data.userDetails));
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
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
        Materialize.toast('Welcome back to Booksville!!', 5000)
        dispatch(setCurrentUser(response.data.userDetails));
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

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(deleteUser());
  }
}
