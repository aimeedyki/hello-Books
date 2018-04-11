import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import ConfigureStore from './store/configureStore';
import reducers from './reducers/index';
import { setAuthorizationToken, getUser } from './actions/authAction';
import { getBooks } from './actions/bookAction';


import App from './components/App.jsx';
import './style/App.scss';

const store = ConfigureStore();

/** @description refreshes state with user details and book details on reload
 *
 * @returns {*} null
 */
export const refreshToken = () => {
  if (localStorage && localStorage.getItem('token')) {
    const decodedToken = jwt.decode(localStorage.token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      setAuthorizationToken(localStorage.getItem('token'));
      store.dispatch(
        getUser()
      );
      store.dispatch(
        getBooks(8, 0, null)
      );
    } else {
      localStorage.clear();
    }
  }
};

refreshToken();

/** @description renders application wrapped in redux store
 *
 * @param {object} [state=initialState]
 * @param {object} action
 *
 * @returns {object} state
 */
render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('main'));
