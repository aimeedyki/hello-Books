/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import { displayUserpage, displayUser } from '../actions/userAction';

import Topnav from './Common/Topnav.jsx';
import Sidenav from './Common/Sidenav.jsx';
import Library from './Library/Library.jsx';
import Borrowed from './Library/Borrowed.jsx';
import Outstanding from './Library/Outstanding.jsx';
import Profile from './Profile/Profile.jsx';
import ChangePassword from './Profile/ChangePassword.jsx';
import Editprofile from './Profile/Editprofile.jsx';
import Addbook from './Library/Addbook.jsx';
import Addcategory from './Library/Addcategory.jsx';
import Useractivity from './Profile/Useractivity.jsx';
import Editbook from './Library/Editbook.jsx';
import Upgrade from './Profile/Upgrade.jsx';

import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';
import admin from '../assets/images/admin.jpg';


/** component that rendrs the users page
 * @class Userpage
 * @extends {Component}
 */
class Userpage extends Component {
  /** Creates an instance of Userpage.
     * @param {any} props 
     * @memberof Userpage
     */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userId: '',
      level: '',
      levelicon: '',
      profilepic: ''
    };
    this.userId = '';
    this.setLevelIcon = this.setLevelIcon.bind(this);
  }

  /** displays user details
   * @returns {*} void
   * @memberof Userpage
   */
  componentDidMount() {
    const { userId } = this.props.user;
    this.props.displayUserpage(userId);
  }

  /* eslint-disable class-methods-use-this */
  /** sets icon according to a users level
   * @param {any} level 
   * @returns {object} users level icon
   * @memberof Userpage
   */
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
  /* eslint-disable no-unused-expressions */
  /** renders the user page
   * @returns {*} users' page
   * @memberof Userpage
   */
  render() {
    const { levelicon } = this.state;
    const { username, level, email, profilepic } = this.props.user;
    let profileImage;
    profilepic === '' || profilepic === null ?
      (profileImage = this.setLevelIcon(level)) : (profileImage = profilepic);
    return (
      <div>
        <Topnav username={username} />
        <Sidenav level={level} levelIcon={profileImage}
          username={username} email={email} />
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
            <Route path='/user/new-level' component={Upgrade} />
          </Switch>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps, {
  displayUserpage, displayUser
})(Userpage);
