import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authentication from './Authentication/Authentication';
import Home from './Home';
import UserPage from './UserPage';

/** @description entry point of the application
   *
   * @param { object } props
   *
   * @returns { JSX } JSX
   */
const App = props => (
  <div>
    <Switch>
      <Route path="/main" component={Authentication(UserPage)} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

export default App;
