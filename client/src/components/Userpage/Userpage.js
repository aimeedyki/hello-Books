import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';
import Library from '../Library/Library';
import Borrowed from '../Borrowed/Borrowed';
import Outstanding from '../Outstanding/Outstanding';
import Profile from '../Profile/Profile'
import ChangePassword from '../ChangePassword/ChangePassword';
import Editprofile from '../Editprofile/Editprofile';
import Addbook from '../Addbook/Addbook';
import Useractivity from '../Useractivity/Useractivity';
import { Switch, Route, Router } from 'react-router-dom';
import photo from '../../assets/images/profilephoto.jpg';
import rookie from '../../assets/images/rookie.jpg';


export default class Userpage extends Component {
  constructor(props) {
    super(props);
  }
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
