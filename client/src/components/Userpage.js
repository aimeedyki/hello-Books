import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import * as actions from '../actions';

import Topnav from './Common/Topnav';
import Sidenav from './Common/Sidenav';
import Library from './Library/Library';
import Borrowed from './Library/Borrowed';
import Outstanding from './Library/Outstanding';
import Profile from './Profile/Profile'
import ChangePassword from './Profile/ChangePassword';
import Editprofile from './Profile/Editprofile';
import Addbook from './Library/Addbook';
import Useractivity from './Profile/Useractivity';

import photo from '../assets/images/profilephoto.jpg';
import rookie from '../assets/images/rookie.jpg';




export default class Userpage extends Component {
  constructor(props) {
    super(props);

    //this.props.protectedTest();
  }

  /*renderContent() {
    if (this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }*/

  render() {
    return (
      <div>
        <Topnav levelicon={rookie} />
        <Sidenav profilepic={photo} firstname='Grace' lastname='Joel' email='gracejoel@gmail.com' />
        <div>
          <Switch>
            <Route exact path={this.props.match.path} component={Library} />
            <Route path="/user/notreturned" component={Outstanding} />
            <Route path="/user/new" component={Addbook} />
            <Route path="/user/password" component={ChangePassword} />
            <Route exact path="/user/profile" component={Editprofile} profilepic={`/images/profilephoto.jpg`} />
            <Route path="/user/history" component={Borrowed} />
            <Route path="/user/notifications" component={Useractivity} />
          </Switch>
        </div>
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Userpage); */
