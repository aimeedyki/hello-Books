import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import bookReducer from './book/bookReducer';
import categoryReducer from './book/categoryReducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  bookReducer,
  categoryReducer
});
export default rootReducer;
