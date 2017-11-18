/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from './Authentication/RequireAuth.jsx';
import Home from './Home.jsx';
import UserPage from './UserPage.jsx';
import NotFound from './NotFound.jsx';

const App = props => (
  <div>
    <Switch>
      <Route path="/user" component={RequireAuth(UserPage)} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
