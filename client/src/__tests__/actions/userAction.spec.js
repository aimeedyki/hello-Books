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

const store = mockStore({ book: {} });
const details = {
  history: {
    id: 1,
  },
  notification: {
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
  test('successfully gets a user borrow history',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });

      const expectedAction = {
        type: GET_HISTORY,
        payload: details.history
      };

      store.dispatch(getHistory(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(GET_HISTORY);
        });
    });
  test('should give an error if there is an error getting user history',
    () => {
      mock.onPost().replyOnce(400, {
        details
      });

      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };

      store.dispatch(getHistory('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('getOutstanding action creator', () => {
  test('successfully gets a user outstanding books',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: GET_OUTSTANDING,
        payload: details.history
      };
      store.dispatch(getOutstanding(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(GET_HISTORY);
        });
    });
  test('should give an error if there is an error with books not returned',
    () => {
      mock.onPost().replyOnce(400, {
        details
      });

      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };

      store.dispatch(getOutstanding('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayNotification action creator', () => {
  test('successfully displays notification',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: DISPLAY_NOTIFICATION,
        payload: details.notification
      };
      store.dispatch(displayNotification(limit, offset))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(DISPLAY_NOTIFICATION);
        });
    });
  test('should give an error if there is an error with books not returned',
    () => {
      mock.onGet().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(displayNotification('invalid'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('passwordChange action creator', () => {
  test('successfully change a password',
    () => {
      mock.onPut().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: CHANGE_PASSWORD
      };
      store.dispatch(passwordChange(password, confirmPassword))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(CHANGE_PASSWORD);
        });
    });
  test('should give an error changing password',
    () => {
      mock.onPost().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(passwordChange('invalid', confirmPassword))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});


describe('changeLevel action creator', () => {
  test('successfully change a user\'s level',
    () => {
      mock.onPut().replyOnce(200, {
        level
      });
      const expectedAction = {
        type: CHANGE_LEVEL
      };
      store.dispatch(changeLevel(
        level.newLevelId, level.transactionId, level.amount))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(CHANGE_LEVEL);
        });
    });
  test('should give an error when level is same as level',
    () => {
      mock.onPut().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(changeLevel(1, level.transactionId, level.amount))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});


describe('changePic action creator', () => {
  test('successfully change a user\'s profile pic',
    () => {
      mock.onPut().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: CHANGE_IMAGE
      };
      store.dispatch(changePic(profilePic))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(CHANGE_IMAGE);
        });
    });
  test('should give an error changing profile picture',
    () => {
      mock.onPut().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(changePic('hey'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayAllTransactions action creator', () => {
  test('successfully displays user transaction',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: DISPLAY_ALL_TRANSACTIONS
      };
      store.dispatch(displayAllTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test('should give an error if there is one',
    () => {
      mock.onGet().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(displayAllTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});
describe('displayConfirmedTransactions action creator', () => {
  test('successfully displays user transaction',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: DISPLAY_ALL_TRANSACTIONS
      };
      store.dispatch(displayConfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test('should give an error if there is one',
    () => {
      mock.onGet().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(displayConfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('displayUnconfirmedTransactions action creator', () => {
  test('successfully displays user transaction',
    () => {
      mock.onGet().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: DISPLAY_ALL_TRANSACTIONS
      };
      store.dispatch(displayUnconfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(DISPLAY_ALL_TRANSACTIONS);
        });
    });
  test('should give an error if there is one',
    () => {
      mock.onGet().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(displayUnconfirmedTransactions())
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('confirmTransactions action creator', () => {
  test('successfully confirms a user transaction',
    () => {
      mock.onPut().replyOnce(200, {
        details
      });
      const expectedAction = {
        type: CONFIRM_TRANSACTION
      };
      store.dispatch(confirmTransaction(level.transactionId))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(CONFIRM_TRANSACTION);
        });
    });
  test('should give an error confirming transaction',
    () => {
      mock.onPut().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(confirmTransaction('h'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});

describe('submitTransactions action creator', () => {
  test('successfully submits a user transaction',
    () => {
      mock.onPost().replyOnce(201, {
        details
      });
      const expectedAction = {
        type: SUBMIT_TRANSACTION
      };
      store.dispatch(submitTransaction(
        level.transactionId, level.transactionType, level.amount))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(SUBMIT_TRANSACTION);
        });
    });
  test('should give an error if the transaction is invalid',
    () => {
      mock.onPost().replyOnce(400, {
        details
      });
      const expectedAction = {
        type: USER_ERROR,
        payload: details.error
      };
      store.dispatch(submitTransaction('h'))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(USER_ERROR);
        });
    });
});
