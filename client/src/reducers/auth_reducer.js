import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  STORE_USER
} from '../actions/types';

const initialState = { error: '', message: '', content: '', authenticated: false, user: {} }

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case STORE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }

}
