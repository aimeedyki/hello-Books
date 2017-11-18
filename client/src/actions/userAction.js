import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL,
  USER_ERROR,
  CHANGE_IMAGE,
  DISPLAY_USER,
  GET_LEVEL,
} from './types';
import {
  errorHandler,
  clearErrorMessage,
  setCurrentUser,
  setAuthorizationToken,
  getUser
} from './authAction';


// displays user details on userpage
export const displayUserpage = () => {
  let user = {};
  user = localStorage.getItem('user');
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: JSON.parse(user)
    });
  };
};

// gets the history of a user
export const getHistory = (userId, limit, offset) => (
  dispatch => (
    axios
      .get(`/api/v1/users/${userId}/books?offset=${offset}&limit=${limit}`)
      .then((response) => {
        dispatch({
          type: GET_HISTORY,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const getOutstanding = (limit, offset) => (
  dispatch => (
    axios
      .get(`/api/v1/user/books?returned=false&offset=${offset}&limit=${limit}`)
      .then((response) => {
        dispatch({
          type: GET_OUTSTANDING,
          payload: response.data
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const displayNotification = () => (
  dispatch => (
    axios.get('/api/v1/notifications')
      .then((response) => {
        dispatch({
          type: DISPLAY_NOTIFICATION,
          payload: response.data.notifications
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
      })
  )
);

export const passwordChange = (newPassword, confirmNewPassword) => (
  dispatch => (
    axios.put('/api/v1/user/password',
      { newPassword, confirmNewPassword })
      .then(() => {
        dispatch({
          type: CHANGE_PASSWORD,
        });
        Materialize.toast('Password changed successfully!!',
          4000, 'indigo darken-2');
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000,
          'indigo darken-2', () => {
            clearErrorMessage();
          });
      })
  )
);

export const changeLevel = newLevelId => (
  dispatch => (
    axios.put('/api/v1/user/level', { newLevelId })
      .then(() => {
        dispatch(getUser());
        /* eslint-disable no-undef */
        Materialize.toast('Level changed successfully!!',
          4000, 'indigo darken-2');
        return true;
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000,
          'indigo darken-2', () => {
            clearErrorMessage();
          });
      })
  )
);

export const changePic = (userId, profilepic) => (
  dispatch => (
    axios.put(`api/v1/users/${userId}/image`, { profilepic })
      .then(() => {
        dispatch({
          type: CHANGE_IMAGE,
        });
        /* eslint-disable no-undef */
        Materialize.toast('Profile picture changed successfully!!',
          4000, 'indigo darken-2');
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);
