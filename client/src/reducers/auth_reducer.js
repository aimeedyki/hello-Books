import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER
} from '../actions/types';

const initialState = { error: '', message: '', authenticated: false, user: {} };

/** reducers for authentication component
 * @export
 * @param {any} [state=initialState] 
 * @param {any} action 
 * @returns {*} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.user,
        authenticated: true
      };
    case UNAUTH_USER:
      return {
        ...state,
        user: {},
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };

    default:
      return state;
  }
};
