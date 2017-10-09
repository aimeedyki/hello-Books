import axios from 'axios';
import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL,
  USER_ERROR,
  CHANGE_IMAGE,
  DISPLAY_USER
} from './types';
import { errorHandler } from './authAction';

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
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
      })
  )
);

export const changeLevel = (userId, newLevel) => (
  dispatch => (
    axios.put(`${API_URL}/users/${userId}/level`, { newLevel })
      .then(() => {
        dispatch({
          type: CHANGE_LEVEL,
        });
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
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
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response.data, USER_ERROR);
      })
  )
);
