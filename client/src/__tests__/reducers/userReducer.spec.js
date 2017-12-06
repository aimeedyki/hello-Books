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

describe('book reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      payload: {
        id: 3,
        username: 'aimee',
        email: 'aimee@example.com'
      }
    };

    const state = {

    };
    // const newCategories = [{
    //   id: 1,
    //   name: 'a category'
    // }, {
    //   id: 2,
    //   name: 'some category'
    // }];
    action.type = GET_USER;
    expect(userReducer(state, action).user).toEqual(action.payload);

    action.type = GET_HISTORY;
    action.payload = {
      id: 1,
      user: 'aimee'
    };
    expect(userReducer(state, action).histories).toEqual(action.payload);

    action.type = GET_OUTSTANDING;
    expect(userReducer(state, action).notReturned).toEqual(action.payload);

    action.type = DISPLAY_NOTIFICATION;
    expect(userReducer(state, action).notifications).toEqual(action.payload);

    action.type = DISPLAY_ALL_TRANSACTIONS;
    expect(userReducer(state, action).transactions).toEqual(action.payload);

    action.type = CHANGE_PASSWORD;
    expect(userReducer(state, action)).toEqual(state);

    action.type = CHANGE_LEVEL;
    expect(userReducer(state, action)).toEqual(state);

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

    action.type = USER_ERROR;
    action.payload = 'an error';
    expect(userReducer(state, action).error).toEqual(action.payload);
  });
});
