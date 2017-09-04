import React, { Component } from 'react';
import Home from './components/Home/Home';
import Userpage from './components/Userpage/Userpage';
import Library from './components/Library/Library';
import {Route, Switch} from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component = {Home} />
        <Route path = '/user' component = {Userpage}/>
        <Route exact path = {'/books'} component={Library}/>
      </Switch>
    );
  }
}



export default App;
