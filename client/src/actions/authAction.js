/* eslint-disable no-unused-vars */
import axios from 'axios';
import { browserHistory } from 'react-router-dom';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER,
} from './types';

/**
 * @description sets authorization token to header
 * @param {string} token
 * @return {*} null
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

/**
 * @description clears error message in store
 * @return {*} null
 */
export const clearErrorMessage = () => ({
  type: CLEAR_ERROR
});

/**
 * @description sets user details to store
 * @param {object} user user details
 * @return {*} null
 */
export const setCurrentUser = user => ({
  type: AUTH_USER,
  payload: user
});

/**
 * @description deletes user details
 * @return {*} null
 */
export const deleteUser = () => ({
  type: UNAUTH_USER
});

/**
 * @description logs out user
 * @return {*} null
 */
export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken('');
    dispatch(deleteUser());
  }
);

/**
 * @description handles errors
 * @param {*} dispatch 
 * @param {object} error
 * @param {*} type
 * @return {*} null
 */
export const errorHandler = (dispatch, error, type) => {
  if (error.status === 403) {
    dispatch({
      type,
      payload: error.data.message
    });
    logoutUser();
  } else {
    dispatch({
      type,
      payload: error.data.message
    });
  }
};

/**
 * @description registers a user
 * @param {string} email user email
 * @param {string} username user name
 * @param {string} password user password
 * @param {number} levelId  user level id
 * @return {boolean} boolean
 */
export const signupUser = ({ email, username, password, levelId }) => (
  dispatch => (
    axios.post('/api/v1/users/signup', { email, username, password, levelId })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch(setCurrentUser(response.data.user));
        /* eslint-disable no-undef */
        Materialize.toast('Signup successful! Welcome to Booksville',
          5000, 'indigo darken-2');
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

/**
 * @description logs in user
 * @param {*} username user name
 * @param {string} password user password
 * @return {boolean} boolean
 */
export const signinUser = ({ username, password }) => (
  dispatch => (
    axios.post('/api/v1/users/signin', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        /* eslint-disable no-undef */
        Materialize.toast('Welcome back to Booksville!!',
          5000, 'indigo darken-2');
        dispatch(setCurrentUser(response.data.user));
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

/**
 * @description gets user details
 * @return {object} user detail
 */
export const getUser = () => (
  dispatch => (
    axios.get('/api/v1/user/profile')
      .then((response) => {
        dispatch(setCurrentUser(response.data.userProfile));
      })
      .catch((error) => {
        console.log(error);
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

