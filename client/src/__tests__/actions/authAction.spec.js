import axios from 'axios';
import {
  mock, mockStore
} from '../../__mocks__/mockConfig';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
} from '../../actions/types';
import {
  signupUser, signinUser, getUser, logoutUser
} from '../../actions/authAction';

const details = {
  user: {
    email: 'aimee@yahoo.com',
    username: 'aimee',
    name: 'aimee',
    level: 'rookie'
  },

  error: 'this is an error'
};

describe('signupUser action creator', () => {
  test(`should dispatch an action type AUTH_USER 
  when it successfully signs up a user with valid details`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(201, {
        user: details.user
      });

      const expectedAction = [{
        type: AUTH_USER,
        payload: details.user
      }];

      store.dispatch(signupUser(details.user))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });

  test('should dispatch an action type AUTH_ERROR when sign up is unsuccessful',
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });

      const expectedAction = [{
        type: AUTH_ERROR,
        payload: details.error
      }];

      store.dispatch(signupUser(details.user))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});

describe('signinUser action creator', () => {
  test(`should dispatch an action type AUTH_USER 
  when successfully signs in a user with valid details`,
    () => {
      const store = mockStore({});
      mock.restore();
      mock.onPost().replyOnce(200, {
        user: details.user
      });

      const expectedAction = [{
        type: AUTH_USER,
        payload: { details }
      }];

      store.dispatch(signinUser(details.user.username, 'password'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });
  test('should dispatch an action type AUTH_ERROR when signin is unsuccessful',
    () => {
      const store = mockStore({});
      mock.restore();
      mock.onPost().replyOnce(400, {
        message: details.error
      });

      const expectedAction = [{
        type: AUTH_ERROR,
        payload: details.error
      }];
      store.dispatch(signinUser(details.user.username, undefined))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});
describe('getUser action creator', () => {
  test(`should dispatch an action type AUTH_USER
   when it successfully gets user's details`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        user: details.error
      });

      const expectedAction = {
        type: AUTH_USER,
        payload: { details }
      };

      store.dispatch(getUser())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });
  test(`should dispatch an action type AUTH_ERROR 
  if there is an error in fetching user details`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });

      const expectedAction = [{
        type: AUTH_ERROR,
        payload: details.error
      }];
      store.dispatch(getUser())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});
