import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  USER_ERROR,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL,
  DISPLAY_USER,
  GET_LEVEL,
  DISPLAY_ALL_TRANSACTIONS
} from '../actions/types';


const initialState = {
  user: {},
  error: [],
  histories: [],
  notReturned: [],
  notifications: [],
  userDetails: {},
  level: {},
  transactions: []
};
/** reducers for user components
 * @export
 * @param {Object} [state=initialState]
 * @param {*} action
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
    case DISPLAY_USER:
      return { ...state, userDetails: action.payload };
    case GET_LEVEL:
      return { ...state, level: action.payload };
    case DISPLAY_ALL_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};
