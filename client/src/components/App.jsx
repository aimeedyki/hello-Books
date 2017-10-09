/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Requireauth from './Authentication/Requireauth.jsx';
import Home from './Home.jsx';
import Userpage from './Userpage.jsx';
import Notfound from './Notfound.jsx';
import Addbook from './Library/Addbook.jsx';

const App = props => (
  <div>
    <Switch>
      <Route path='/user' component={Requireauth(Userpage)} />
      <Route path='/books/add' component={Addbook} />
      <Route path='/' component={Home} />
      <Route path="*" component={Notfound} />
    </Switch>
  </div>

);

export default App;
