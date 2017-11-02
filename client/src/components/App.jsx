/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RequireAuth from './Authentication/RequireAuth.jsx';
import Home from './Home.jsx';
import Userpage from './Userpage.jsx';
import Notfound from './Notfound.jsx';

const App = props => (
  <div>
    <Switch>
      <Route path='/user' component={RequireAuth(Userpage)} />
      <Route path='/' component={Home} />
      <Route component={Notfound} />
    </Switch>
  </div>
);

export default App;
