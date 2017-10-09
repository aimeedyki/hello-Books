import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  USER_ERROR,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL,
  DISPLAY_USER,
} from '../actions/types';


const initialState = {
  user: {},
  error: [],
  histories: [],
  notReturned: [],
  notifications: [],
  userDetails: {}
};
/** reducers for user components
 * @export
 * @param {any} [state=initialState]
 * @param {any} action
 * @returns {*} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_HISTORY:
      return { ...state, histories: action.payload };
    case GET_OUTSTANDING:
      return { ...state, notReturned: action.payload };
    case USER_ERROR:
      return { ...state, error: action.payload };
    case DISPLAY_NOTIFICATION:
      return { ...state, notifications: action.payload };
    case CHANGE_PASSWORD:
      return { ...state };
    case CHANGE_LEVEL:
      return { ...state };
    case DISPLAY_USER:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};
