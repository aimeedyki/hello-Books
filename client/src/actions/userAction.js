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
  DISPLAY_USER,
  GET_LEVEL,
  DISPLAY_ALL_TRANSACTIONS,
  SUBMIT_TRANSACTION
} from './types';
import {
  errorHandler,
  clearErrorMessage,
  setCurrentUser,
  setAuthorizationToken,
  getUser
} from './authAction';

// gets the history of a user
export const getHistory = (limit, offset) => (
  dispatch => (
    axios
      .get(`/api/v1/user/books?offset=${offset}&limit=${limit}`)
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

export const passwordChange = (
  oldPassword, newPassword, confirmNewPassword) => (
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

export const changeLevel = ({ newLevelId, transactionId, amount }) => (
  dispatch => (
    axios.put('/api/v1/user/level', { newLevelId, transactionId, amount })
      .then(() => {
        dispatch(getUser());
        Materialize.toast('Level Change has been requested!!',
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

export const changePic = profilePic => (
  dispatch => (
    axios.put('/api/v1/user/profile-image', { profilePic })
      .then(() => {
        dispatch({
          type: CHANGE_IMAGE
        });
        dispatch(getUser());
        Materialize.toast('Profile picture changed successfully!!',
          4000, 'indigo darken-2');
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const displayAllTransactions = () => (
  dispatch => (
    axios.get('/api/v1/transactions')
      .then((response) => {
        dispatch({
          type: DISPLAY_ALL_TRANSACTIONS,
          payload: response.data.allTransactions
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const displayConfirmedTransactions = () => (
  dispatch => (
    axios.get('/api/v1/transactions?confirmed=true')
      .then((response) => {
        dispatch({
          type: DISPLAY_ALL_TRANSACTIONS,
          payload: response.data.allTransactions
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const displayUnconfirmedTransactions = () => (
  dispatch => (
    axios.get('/api/v1/transactions?confirmed=false')
      .then((response) => {
        dispatch({
          type: DISPLAY_ALL_TRANSACTIONS,
          payload: response.data.allTransactions
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const confirmTransaction = transactionId => (
  dispatch => (
    axios.put('/api/v1/transactions', { transactionId })
      .then((response) => {
        dispatch(displayAllTransactions());
        return true;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      })
  )
);

export const submitTransaction = (
  { transactionId, transactionType, amount }) => (
    dispatch => (
      axios.post('/api/v1/transactions',
        { transactionId, transactionType, amount })
        .then((response) => {
          dispatch({
            type: SUBMIT_TRANSACTION,
            payload: response.data.transaction
          });
          return true;
        })
        .catch((error) => {
          errorHandler(dispatch, error.response, USER_ERROR);
        })
    )
  );
