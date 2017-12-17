import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from './Authentication/RequireAuth';
import Home from './Home';
import UserPage from './UserPage';

const App = props => (
  <div>
    <Switch>
      <Route path="/main" component={RequireAuth(UserPage)} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

export default App;
