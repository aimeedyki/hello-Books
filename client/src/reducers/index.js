import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import bookReducer from './book_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userReducer: userReducer,
  bookReducer: bookReducer
});
export default rootReducer;  
