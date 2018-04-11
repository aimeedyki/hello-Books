import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER,
} from './types';

/** @description sets authorization token to header
 *
 * @param {string} token
 *
 * @return {*} null
 */
export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

/** @description clears error message in store
 *
 * @return {Object} with a type as string
 */
export const clearErrorMessage = () => ({
  type: CLEAR_ERROR
});

/** @description sets user details to store
 *
 * @param {object} user user details
 *
 * @return {Object} with a type as string and a user object
 */
export const setCurrentUser = user => ({
  type: AUTH_USER,
  payload: user
});

/** @description deletes user details
 *
 * @return {Object} with a type as string
 */
export const deleteUser = () => ({
  type: UNAUTH_USER
});

/** @description logs out an already logged in user
 *
 * @return {function} dispatch
 */
export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken('');
    dispatch(deleteUser());
  }
);

/** @description handles application errors
 *
 * @param {function} dispatch dispatch function
 * @param {object} error error
 * @param {string} type action type
 *
 * @return {function} dispatch
 */
export const errorHandler = (dispatch, error, type) => {
  dispatch({
    type,
    payload: error.data.message
  });
};

/** @description registers a user
 *
 * @param {string} email user email
 * @param {string} username user name
 * @param {string} password user password
 * @param {number} levelId  user level id
 *
 * @return {function} dispatch
 */
export const signupUser =
  ({ email, username, name, password, googleId, profilePic }) => (
    dispatch => (
      axios.post('/api/v1/users/signup',
        { email, username, name, password, googleId, profilePic })
        .then((response) => {
          setAuthorizationToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          dispatch(setCurrentUser(response.data.user));
          Materialize.toast('Signup successful! Welcome to Booksville',
            5000, 'indigo darken-2');
          return true;
        })
        .catch((error) => {
          errorHandler(dispatch, error.response, AUTH_ERROR);
        })
    )
  );

/** @description logs in user
 *
 * @param {string} email google user's email
 * @param {string} username user's username
 * @param {string} name google user name
 * @param {string} password user's password
 * @param {string} googleId google user's Id
 * @param {string} profilePic google user's profilePic
 * 
 * @return {function} dispatch
 */
export const signinUser =
  ({ email, username, name, password, googleId, profilePic }) => (
    dispatch => (
      axios.post('/api/v1/users/signin',
        { email, username, name, password, googleId, profilePic })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          setAuthorizationToken(response.data.token);
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

/** @description gets user details
 *
 * @return {function} dispatch
 */
export const getUser = () => (
  dispatch => (
    axios.get('/api/v1/user/profile')
      .then((response) => {
        dispatch(setCurrentUser(response.data.userProfile));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      })
  )
);

