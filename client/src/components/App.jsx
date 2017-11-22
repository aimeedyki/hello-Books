/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from './Authentication/RequireAuth';
import Home from './Home';
import UserPage from './UserPage';
import NotFound from './NotFound';

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
