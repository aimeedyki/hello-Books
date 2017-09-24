import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import { displayUserpage } from '../actions/userAction.js';


import Topnav from './Common/Topnav.jsx';
import Sidenav from './Common/Sidenav.jsx';
import Library from './Library/Library.jsx';
import Borrowed from './Library/Borrowed.jsx';
import Outstanding from './Library/Outstanding.jsx';
import Profile from './Profile/Profile.jsx'
import ChangePassword from './Profile/ChangePassword.jsx';
import Editprofile from './Profile/Editprofile.jsx';
import Addbook from './Library/Addbook.jsx';
import Addcategory from './Library/Addcategory.jsx';
import Useractivity from './Profile/Useractivity.jsx';
import Editbook from './Library/Editbook.jsx';


import photo from '../assets/images/profilephoto.jpg';
import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';
import admin from '../assets/images/admin.jpg';




class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userId: '',
      level: '',
      levelicon: ''
    };
    this.setLevelIcon = this.setLevelIcon.bind(this);
  }

  componentWillMount() {
    this.props.displayUserpage();
  }

  componentDidMount() {
    const { username, email, level, userId } = this.props;
    this.setState({
      username,
      email,
      level,
      userId
    });
  }

  setLevelIcon(level) {
    switch (level) {
      case 'rookie':
        return rookie;
      case 'bookworm':
        return bookworm;
      case 'voracious':
        return voracious;
      case 'admin':
        return admin;
      default:
        return rookie;
    }
  }
  render() {
    const { levelicon } = this.state;
    const { username, level, email } = this.props.user;

    return (
      <div>
        <Topnav username={username} />
        <Sidenav levelIcon={this.setLevelIcon(level)} username={username} email={email} />
        <div>
          <Switch>
            <Route exact path={this.props.match.path} component={Library} />
            <Route path='/user/notreturned' component={Outstanding} />
            <Route path='/user/new' component={Addbook} />
            <Route path='/user/password' component={ChangePassword} />
            <Route exact path='/user/profile' component={Profile} />
            <Route path='/user/edit-profile' component={Editprofile} />
            <Route path='/user/history' component={Borrowed} />
            <Route path='/user/notifications' component={Useractivity} />
            <Route path='/user/books' component={Addbook} />
            <Route path='/user/:id/edit-book' component={Editbook} />
            <Route path='/user/category' component={Addcategory} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.userReducer;
  return {
    user
  };
}

export default connect(mapStateToProps, {
  displayUserpage
})(Userpage);
