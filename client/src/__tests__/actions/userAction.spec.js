import axios from 'axios';
import {
  mock, mockStore
} from '../../__mocks__/mockConfig';
import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL,
  USER_ERROR,
  CHANGE_IMAGE,
  DISPLAY_USER,
  GET_LEVEL,
  DISPLAY_ALL_TRANSACTIONS,
  CONFIRM_TRANSACTION,
  SUBMIT_TRANSACTION
} from '../../actions/types';
import {
  getHistory, getOutstanding, displayNotification, passwordChange,
  changeLevel, changePic, displayAllTransactions, displayConfirmedTransactions,
  displayUnconfirmedTransactions, confirmTransaction, submitTransaction
} from '../../actions/userAction';


const details = {
  history: {
    id: 1,
  },
  notification: {
    id: 1
  },
  transaction: {
    id: 1
  },
  error: 'this is an error'
};
const level = {
  newLevelId: 2, transactionId: 2, amount: 1000, transactionType: 'surcharge'
};
const limit = 8;
const offset = 0;
const password = 'password';
const confirmPassword = 'password';
const profilePic = 'pic.jpg';

const clearErrorMessage = jest.fn();

describe('getHistory action creator', () => {
  test(`dispatches an action type GET_HISTORY when fetching 
  a user\'s borrow history`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, details.history);

      const expectedAction = [{
        type: GET_HISTORY,
        payload: details.history
      }];

      store.dispatch(getHistory(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_HISTORY);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error getting user history`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });

      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];

      store.dispatch(getHistory('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('getOutstanding action creator', () => {
  test(`should dispatch an action type GET_OUTSTANDING 
  when successfully gets a user outstanding books`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, details.history);
      const expectedAction = [{
        type: GET_OUTSTANDING,
        payload: details.history
      }];
      store.dispatch(getOutstanding(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(GET_OUTSTANDING);
        });
    });
  test(`should should dispatch an action type USER_ERROR 
  if there is an error with books not returned`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });

      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };

      store.dispatch(getOutstanding('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayNotification action creator', () => {
  test(`should dispatch an action type DISPLAY_NOTIFICATION 
  when it successfully displays notification`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        notifications: details.notification
      });
      const expectedAction = [{
        type: DISPLAY_NOTIFICATION,
        payload: details.notification
      }];
      store.dispatch(displayNotification(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DISPLAY_NOTIFICATION);
        });
    });
  test(`should should dispatch an action type USER_ERROR 
  if there is an error fetching books not returned`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(displayNotification('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('passwordChange action creator', () => {
  test(`should dispatch an action type CHANGE_PASSWORD 
  when password is changed successfully`,
    () => {
      const store = mockStore({});
      mock.onPut().replyOnce(200, {});
      const expectedAction = [{
        type: CHANGE_PASSWORD
      }];
      store.dispatch(passwordChange(password, confirmPassword))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(CHANGE_PASSWORD);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error changing password`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(passwordChange('invalid', confirmPassword))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('changePic action creator', () => {
  test(`should dispatch an action type CHANGE_IMAGE
   when it successfully changes a user's profile pic`,
    () => {
      const store = mockStore({});
      mock.onPut().replyOnce(200, {
        details
      });
      const expectedAction = [{
        type: CHANGE_IMAGE
      }];
      store.dispatch(changePic(profilePic))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(CHANGE_IMAGE);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error changing profile picture`,
    () => {
      const store = mockStore({});
      mock.onPut().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(changePic('hey'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayAllTransactions action creator', () => {
  test(`should dispatch an action type DISPLAY_ALL_TRANSACTION 
  when it successfully fetches all transaction`,
    () => {
      const store = mockStore({});
      mock.restore();

      mock.onGet().replyOnce(200, {
        allTransactions: details.transaction
      });
      const expectedAction = {
        type: DISPLAY_ALL_TRANSACTIONS
      };
      store.dispatch(displayAllTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error displaying transactions`,
    () => {
      const store = mockStore({});
      mock.restore();
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(displayAllTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});
describe('displayConfirmedTransactions action creator', () => {
  test(`should dispatch an action type DISPLAY_ALL_TRANSACTION 
  when it successfully fetches all confirmed `,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        allTransactions: details.transaction
      });
      const expectedAction = [{
        type: DISPLAY_ALL_TRANSACTIONS
      }];
      store.dispatch(displayConfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error fetching transactions`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(displayConfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayUnconfirmedTransactions action creator', () => {
  test(`should dispatch an action type DISPLAY_ALL_TRANSACTION 
  when it successfully fetches all unconfirmed transactions`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(200, {
        allTransactions: details.transaction
      });
      const expectedAction = [{
        type: DISPLAY_ALL_TRANSACTIONS
      }];
      store.dispatch(displayUnconfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error fetching transactions`,
    () => {
      const store = mockStore({});
      mock.onGet().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(displayUnconfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('confirmTransactions action creator', () => {
  test(`should dispatch an action type CONFIRM_TRANSACTION 
  when it successfully confirms a transaction`,
    () => {
      const store = mockStore({});
      mock.onPut().replyOnce(200, {});
      const expectedAction = [{
        type: CONFIRM_TRANSACTION
      }];
      store.dispatch(confirmTransaction(level.transactionId))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(CONFIRM_TRANSACTION);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error displaying transactions`,
    () => {
      const store = mockStore({});
      mock.onPut().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(confirmTransaction('h'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('submitTransactions action creator', () => {
  test(`should dispatch an action type DISPLAY_ALL_TRANSACTION 
  when it successfully submits a transaction`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(201, {
        transaction: details.transaction
      });
      const expectedAction = [{
        type: SUBMIT_TRANSACTION
      }];
      store.dispatch(submitTransaction(
        level.transactionId, level.transactionType, level.amount))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(SUBMIT_TRANSACTION);
        });
    });
  test(`should dispatch an action type USER_ERROR 
  if there is an error submiting transactions`,
    () => {
      const store = mockStore({});
      mock.onPost().replyOnce(400, {
        message: details.error
      });
      const expectedAction = [{
        type: USER_ERROR,
        payload: details.error
      }];
      store.dispatch(submitTransaction('h'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions).toEqual(expectedAction);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});
