import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  bookReducer
});
export default rootReducer;
