/* eslint-disable no-unused-vars */
import axios from 'axios';
import { browserHistory } from 'react-router-dom';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER

} from './types';

const API_URL = 'http://localhost:5000/api/v1';


export const clearErrorMessage = () => ({
  type: CLEAR_ERROR
});

export const deleteUser = () => ({
  type: UNAUTH_USER
});

export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
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

export const setCurrentUser = user => ({
  type: AUTH_USER,
  user
});

export const signupUser = ({ email, username, password, level }) => (
  dispatch => (
    axios.post(`${API_URL}/users/signup`,
      { email, username, password, level })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
        dispatch(setCurrentUser(response.data.userDetails));
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, AUTH_ERROR);
      })
  )
);

export const signinUser = ({ username, password }) => (
  dispatch => (
    axios.post(`${API_URL}/users/signin`, { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
        dispatch(setCurrentUser(response.data.userDetails));
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

