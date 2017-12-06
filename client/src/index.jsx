import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ConfigureStore from './store/configureStore';
import reducers from './reducers/index';
import { setAuthorizationToken, getUser } from './actions/authAction';
import { getBooks } from './actions/bookAction';


import App from './components/App.jsx';
import './style/App.scss';

const store = ConfigureStore();


const refreshToken = () => {
  if (localStorage.getItem('token')) {
    setAuthorizationToken(localStorage.getItem('token'));
    store.dispatch(
      getUser()
    );
    store.dispatch(
      getBooks(8, 0, null)
    );
  }
};

refreshToken();

render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('main'));

export default refreshToken;
