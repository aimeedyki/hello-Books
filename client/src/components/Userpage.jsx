import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import {displayUserpage} from '../actions/userAction';


import Topnav from './Common/Topnav.jsx';
import Sidenav from './Common/Sidenav.jsx';
import Library from './Library/Library.jsx';
import Borrowed from './Library/Borrowed.jsx';
import Outstanding from './Library/Outstanding.jsx';
import Profile from './Profile/Profile.jsx'
import ChangePassword from './Profile/ChangePassword.jsx';
import Editprofile from './Profile/Editprofile.jsx';
import Addbook from './Library/Addbook.jsx';
import Useractivity from './Profile/Useractivity.jsx';

import photo from '../assets/images/profilephoto.jpg';
import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';
import admin from '../assets/images/admin.jpg';




export default class Userpage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    // this.props.displayUserpage();
    // switch(this.props.user.level) {
    //   case 'rookie':
    //     return levelicon={rookie}
    //   case 'bookworm':
    //     return levelicon ={bookworm}   
    //   case 'voracious':
    //     return levelicon = {voracious}
    //   case 'admin':
    //     return levelicon = {admin}  
    // } 
  }

  render() {
    return (
      <div>
        <Topnav levelicon={rookie} />
        <Sidenav profilepic={photo} username="@aimee" email="aimee@yahoo.com" />
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

// function mapStateToProps(state) {
//   return { user: userReducer.user};
// }

// export default connect(mapStateToProps, {
//   displayUserpage
// })(Userpage);
