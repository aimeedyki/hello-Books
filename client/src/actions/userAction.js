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

/** @description action creator to get users borrow history
 *
 * @param {number} limit The maximum number of items to display
 * @param {number} offset The offset from the first result to list from
 *
 * @return {function} dispatch
 */
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

/** @description action creator to get a users outstanding books
 *
 * @param {number} limit The maximum number of items to display
 * @param {number} offset The offset from the first result to list from
 *
 * @return {function} dispatch
 */
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

/** @description action creator to display notifications
 *
 * @return {function} dispatch
 */
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

/** @description action creator to change password
 *
 * @param {string} oldPassword users old password
 * @param {string} newPassword users new password
 * @param {string} confirmNewPassword confirms user password
 * 
 * @return {function} dispatch
 */
export const passwordChange = (
  oldPassword, newPassword, confirmNewPassword) => (
  dispatch => (
    axios.put('/api/v1/user/password',
      { oldPassword, newPassword, confirmNewPassword })
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

/** @description action creator to change level of user
 *
 * @param {number} newLevelId id of the new level
 * @param {string} transactionId the id of the transaction
 * @param {number} amount amount paid to change level
 * 
 * @return {function} dispatch
 */
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

/** @description action creator to change picture
 *
 * @param {string} profilePic profile picture url
 * 
 * @return {function} dispatch
 */
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

/** @description action creator to display all transactions to admin
 *
 * @return {function} dispatch
 */
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

/** @description action creator to display confirmed transactions to admin
 *
 * @return {function} dispatch
 */
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

/** @description action creator to display unconfirmed transactions to admin
 *
 * @return {function} dispatch
 */
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

/** @description action creator to confirm a transaction
 *
 * @param {number} transactionId id of transaction
 *
 * @return {function} dispatch
 */
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

/** @description action creator to submit a payment transaction
 *
 * @param {string} transactionId id of transaction
 * @param {string} transactionType the type of transaction
 * @param {number} amount amount paid
 *
 * @return {function} dispatch
 */
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
