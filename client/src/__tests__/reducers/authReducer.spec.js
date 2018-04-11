import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER
} from '../../actions/types.js';
import authReducer from '../../reducers/auth/authReducer';


const action = {
  payload: {
    user: {
      id: 4,
      username: 'aimee',
      email: 'aimee@example.com'
    },
  },
};

const state = {};
describe('auth reducer', () => {
  test('should return initial state when there is no action', () => {
    expect(authReducer(state, {})).toEqual(state);
  });

  test('should return user and authenticated flag' +
    'when action type is AUTH_USER', () => {
    action.type = AUTH_USER;
    expect(authReducer(state, action).user).toEqual(action.payload);
    expect(authReducer(state, action).authenticated).toEqual(true);
  });

  test('should clear user and set authentication flag to false'
  + 'when action type is AUTH_USER', () => {
    action.type = UNAUTH_USER;
    expect(authReducer(state, action).user).toEqual({});
    expect(authReducer(state, action).authenticated).toEqual(false);
  });

  test('should return an error when action type is AUTH_ERROR', () => {
    action.type = AUTH_ERROR;
    action.payload = { error: 'an error' };
    expect(authReducer(state, action).error).toEqual(action.payload);
  });

  test('should return clear err when action type is AUTH_USER', () => {
    action.type = CLEAR_ERROR;
    expect(authReducer(state, action).error).toEqual('');
  });
});
