import React from 'react';
import Home from './Home/Home';
import Userpage from './Userpage/Userpage';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (

      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user' component={Userpage} />
        </Switch>
      </div>

    )
  }
}



