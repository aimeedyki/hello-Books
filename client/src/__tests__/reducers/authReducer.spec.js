import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER
} from '../../actions/types.js';
import authReducer from '../../reducers/auth/authReducer';

describe('auth reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      payload: {
        user: {
          id: 4,
          username: 'aimee',
          email: 'aimee@example.com'
        },
      },
    };

    const state = undefined;

    action.type = AUTH_USER;
    expect(authReducer(state, action).user).toEqual(action.payload);
    expect(authReducer(state, action).authenticated).toEqual(true);

    action.type = UNAUTH_USER;
    expect(authReducer(state, action).user).toEqual({});
    expect(authReducer(state, action).authenticated).toEqual(false);

    action.type = AUTH_ERROR;
    action.payload = { error: 'an error' };
    expect(authReducer(state, action).error).toEqual(action.payload);

    action.type = CLEAR_ERROR;
    expect(authReducer(state, action).error).toEqual('');
  });
});
