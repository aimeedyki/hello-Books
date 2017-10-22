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
import { errorHandler,
  clearErrorMessage,
  setCurrentUser,
  setAuthorizationToken } from './authAction';

const API_URL = 'http://localhost:5000/api/v1';

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

// displays user details on userpage
export const displayUser = userId => (
  dispatch => (
    axios.get(`${API_URL}/users/${userId}`)
      .then((response) => {
        dispatch({
          type: DISPLAY_USER,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

// gets the history of a user
export const getHistory = userId => (
  dispatch => (
    axios.get(`${API_URL}/users/${userId}/books`)
      .then((response) => {
        dispatch({
          type: GET_HISTORY,
          payload: response.data.histories
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const getOutstanding = userId => (
  dispatch => (
    axios.get(`${API_URL}/users/${userId}/books?returned=false`)
      .then((response) => {
        dispatch({
          type: GET_OUTSTANDING,
          payload: response.data.histories
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const displayNotification = () => (
  dispatch => (
    axios.get(`${API_URL}/notifications`)
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

export const passwordChange = (userId, oldPassword, newPassword) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}`, { oldPassword, newPassword })
      .then(() => {
        dispatch({
          type: CHANGE_PASSWORD,
        });
        /* eslint-disable no-undef */
        Materialize.toast('Password changed successfully!!', 4000);
        window.location.reload();
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000, '', () => {
          clearErrorMessage();
        });
      })
  )
);

export const getUserLevel = id => (
  dispatch => (
    axios.get(`${API_URL}/users/${id}/level`)
      .then((response) => {
        dispatch({
          type: GET_LEVEL,
          payload: response.data.level
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
      })
  )
);

export const getUserUpdate = id => (
  dispatch => (
    axios.get(`${API_URL}/users/${id}`)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
      })
  )
);

export const changeLevel = (userId, levelId) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}/level`, { levelId })
      .then(() => {
        dispatch({
          type: CHANGE_LEVEL,
        });
        /* eslint-disable no-undef */
        Materialize.toast('Level changed successfully!!', 4000);
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 4000, '', () => {
          clearErrorMessage();
        });
      })
  )
);

export const changePic = (userId, profilepic) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}/image`, { profilepic })
      .then(() => {
        dispatch({
          type: CHANGE_IMAGE,
        });
        /* eslint-disable no-undef */
        Materialize.toast('Profile picture changed successfully!!', 4000);
        return true;
      })
      .catch((error) => {
        console.log(error.response);
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);
