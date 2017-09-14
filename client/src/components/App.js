import React from 'react';
import Home from './Home';
import Userpage from './Userpage';
import Library from './Library/Library';
import Notfound from './Notfound';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (

      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user' component={Userpage} />
          <Route path="/you" component={() => <p>Me!</p>} />
          <Route path="*" component={Notfound} />
        </Switch>
      </div>

    )
  }
}



