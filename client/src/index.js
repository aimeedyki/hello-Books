import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import './style/App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';


const store = configureStore();


render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('main'))
