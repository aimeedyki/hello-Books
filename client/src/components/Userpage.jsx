/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

// import { displayUserpage, displayUser } from '../actions/userAction';

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
import ChangeLevel from './Profile/ChangeLevel.jsx';
import Bookcategory from './Library/Bookcategory';
import Notfound from './Notfound'

import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';
import adminImage from '../assets/images/admin.jpg';
import noPicture from '../assets/images/profile.jpeg';


/** @description component that renders the users page
 * @class Userpage
 * @extends {Component}
 */
class Userpage extends Component {
  /** @description Creates an instance of Userpage.
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

  /* eslint-disable class-methods-use-this */
  /** @description sets icon according to a users level
   * @param {number} levelId
   * @param {boolean} adminStatus
   * @returns {object} users level icon
   * @memberof Userpage
   */
  setLevelIcon(levelId, adminStatus) {
    if (adminStatus) {
      return adminImage;
    }
    switch (levelId) {
      case 1:
        return rookie;
      case 2:
        return bookworm;
      case 3:
        return voracious;
      default:
        return rookie;
    }
  }
  /* eslint-disable no-unused-expressions */
  /** @description renders the user page
   * @returns {*} users' page
   * @memberof Userpage
   */
  render() {
    // const { levelicon } = this.state;
    const { username, levelId, email, profilepic, admin } = this.props.user;
    let profileImage;
    profilepic === '' || profilepic === null ?
      (profileImage = noPicture) : (profileImage = profilepic);
    return (
      <div>
        <Topnav username={username}
          levelIcon={this.setLevelIcon(levelId, admin)} />
        <Sidenav profileImage={profileImage}
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
            <Route path='/user/new-level' component={ChangeLevel} />
            <Route path='/user/:categories' component={Bookcategory}/>
            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, {
})(Userpage);
