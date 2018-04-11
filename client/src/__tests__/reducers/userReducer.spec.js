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
  DISPLAY_ALL_TRANSACTIONS,
  SUBMIT_TRANSACTION
} from '../../actions/types';

import userReducer from '../../reducers/user/userReducer';

const state = {
  user: {},
  error: [],
  histories: [],
  notReturned: [],
  notifications: [],
  userDetails: {},
  level: {},
  transactions: []
};
const action = {
  payload: {
    id: 3,
    username: 'aimee',
    email: 'aimee@example.com'
  }
};
describe('user reducer', () => {
  test('it should return initial state when there is no action', () => {
    expect(userReducer(state, {})).toEqual(state);
  });

  test('it should return user details when action type is GET_USER', () => {
    action.type = GET_USER;
    expect(userReducer(state, action).user).toEqual(action.payload);
  });

  test('it should return user history when action type is GET_HISTORY', () => {
    action.type = GET_HISTORY;
    action.payload = {
      id: 1,
      user: 'aimee'
    };
    expect(userReducer(state, action).histories).toEqual(action.payload);
  });

  test('it should return outstanding books when action type is GET_OUTSTANDING',
    () => {
      action.type = GET_OUTSTANDING;
      expect(userReducer(state, action).notReturned).toEqual(action.payload);
    });

  test('it should return notifications for action type, DISPLAY_NOTIFICATION',
    () => {
      action.type = DISPLAY_NOTIFICATION;
      expect(userReducer(state, action).notifications).toEqual(action.payload);
    });

  test('it should get transactions for action type, DISPLAY_ALL_TRANSACTIONS',
    () => {
      action.type = DISPLAY_ALL_TRANSACTIONS;
      expect(userReducer(state, action).transactions).toEqual(action.payload);
    });

  test('it should return state when action type is CHANGE_PASSWORD', () => {
    action.type = CHANGE_PASSWORD;
    expect(userReducer(state, action)).toEqual(state);
  });

  test('it should return user when action type is CHANGE_LEVEL', () => {
    action.type = CHANGE_LEVEL;
    expect(userReducer(state, action)).toEqual(state);
  });

  test('it should return new state when action type is SUBMIT_TRANSACTION',
    () => {
      action.type = SUBMIT_TRANSACTION;
      state.transactions = [action.payload];
      action.payload = {
        id: 2,
        user: 'user2'
      };
      const transactions = [
        {
          id: 1,
          user: 'aimee'
        },
        {
          id: 2,
          user: 'user2'
        }
      ];
      expect(userReducer(state, action)).toEqual(transactions);
    });

  test('it should return an error when action type is USER_ERROR', () => {
    action.type = USER_ERROR;
    action.payload = 'an error';
    expect(userReducer(state, action).error).toEqual(action.payload);
  });
});
