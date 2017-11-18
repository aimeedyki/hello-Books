/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import jwt from 'jsonwebtoken';

import ConfigureStore from './store/configureStore';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import { setAuthorizationToken, getUser } from './actions/authAction';


import App from './components/App.jsx';
import './style/App.scss';

const store = ConfigureStore();


if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(
    getUser()
  );
}

render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('main'));
