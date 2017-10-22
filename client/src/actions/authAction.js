/* eslint-disable no-unused-vars */
import axios from 'axios';
import { browserHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER,
} from './types';

const API_URL = 'http://localhost:5000/api/v1';

/**
 * @description decodes the token
 * @param {string} token 
 * @return {string} decoded user details
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR
});

export const setCurrentUser = user => ({
  type: AUTH_USER,
  payload: user
});

export const deleteUser = () => ({
  type: UNAUTH_USER
});

export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken('');
    dispatch(deleteUser());
  }
);

export const errorHandler = (dispatch, error, type) => {
  if (error.status === 403 || error.status === 400) {
    dispatch({
      type,
      payload: error.data.message

    });
    logoutUser();
  } else if (error.status === 404 || error.status === 422) {
    dispatch({
      type,
      payload: error.data.message
    });
  } else {
    dispatch({
      type,
      payload: error.data.message
    });
  }
};

export const signupUser = ({ email, username, password, levelId }) => (
  dispatch => (
    axios.post(`${API_URL}/users/signup`,
      { email, username, password, levelId })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
        /* eslint-disable no-undef */
        Materialize.toast('Signup successful! Welcome to Booksville', 5000);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

export const signinUser = ({ username, password }) => (
  dispatch => (
    axios.post(`${API_URL}/users/signin`, { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        /* eslint-disable no-undef */
        Materialize.toast('Welcome back to Booksville!!', 5000);
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
        // return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

