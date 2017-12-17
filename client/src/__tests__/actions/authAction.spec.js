import axios from 'axios';
import {
  mock, mockStore
} from '../../__mocks__/mockConfig';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER,
} from '../../actions/types';
import {
  signupUser, signinUser, getUser, logoutUser
} from '../../actions/authAction';


describe('signupUser action creator', () => {
  test('successfully signs up a user when details are valid',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo.com',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        }
      };

      mock.onPost().replyOnce(201, {
        details
      });

      const expectedAction = {
        type: AUTH_USER,
        payload: { details }
      };

      store.dispatch(signupUser(details.user))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });
  test('sign up is unsuccessful when a user details are invalid',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        },
        error: 'this is an error'
      };

      mock.onPost().replyOnce(400, {
        details
      });

      const expectedAction = {
        type: AUTH_ERROR,
        payload: details.error
      };

      store.dispatch(signupUser(details.user))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});

describe('signinUser action creator', () => {
  test('successfully signs up a user when details are valid',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo.com',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        }
      };

      mock.onPost().replyOnce(200, {
        details
      });

      const expectedAction = {
        type: AUTH_USER,
        payload: { details }
      };

      store.dispatch(signinUser(details.user.username, 'password'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });
  test('signin is unsuccessful when a user details are invalid',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        },
        error: 'this is an error'
      };

      mock.onPost().replyOnce(400, {
        details
      });

      const expectedAction = {
        type: AUTH_ERROR,
        payload: details.error
      };

      store.dispatch(signinUser(details.user.username, undefined))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});
describe('getUser action creator', () => {
  test('successfully gets user details',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo.com',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        }
      };
      mock.onGet().replyOnce(200, {
        details
      });

      const expectedAction = {
        type: AUTH_USER,
        payload: { details }
      };

      store.dispatch(getUser())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_USER);
        });
    });
  test('does not get user details',
    () => {
      const store = mockStore({ user: {} });
      const details = {
        user: {
          email: 'aimee@yahoo',
          username: 'aimee',
          name: 'aimee',
          level: 'rookie'
        },
        error: 'this is an error'
      };

      mock.onGet().replyOnce(400, {
        details
      });

      const expectedAction = {
        type: AUTH_ERROR,
        payload: details.error
      };

      store.dispatch(getUser())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(AUTH_ERROR);
        });
    });
});
describe('logoutUser action creator', () => {
  test('successfully signs up a user when details are valid',
    () => {
      const store = mockStore({ user: {} });

      const expectedAction = {
        type: UNAUTH_USER
      };
      // store.dispatch(logoutUser())
      //   .then(() => store.getActions())
      //   .then((actions) => {
      //     expect(actions.length).toBe(1);
      //     expect(actions[0].type).toBe(UNAUTH_USER);
      //     expect(localStorage.clear).not.toHaveBeenCalled();
      //   });
      // const loggedoutUser = logoutUser();
      // expect(loggedoutUser).toEqual(expectedAction);
    });
});
