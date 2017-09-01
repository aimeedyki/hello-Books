import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home/Home';
import User from './components/User/User';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      
      <User/>
      </MuiThemeProvider>
    );
  }
}



export default App;
