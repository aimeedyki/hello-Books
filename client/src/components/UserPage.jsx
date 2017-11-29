import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import AdminAuth from './Authentication/AdminAuth';
import TopNav from './Common/TopNav';
import SideNav from './Common/SideNav';
import Library from './Library/Library';
import Borrowed from './Library/Borrowed';
import Outstanding from './Library/Outstanding';
import Profile from './Profile/Profile';
import ChangePassword from './Profile/ChangePassword';
import EditProfile from './Profile/EditProfile';
import AddBook from './Library/AddBook';
import AddCategory from './Library/AddCategory';
import AdminDashboard from './Dashboard/AdminDashboard';
import EditBook from './Library/EditBook';
import ChangeLevel from './Profile/ChangeLevel';
import BookCategory from './Library/BookCategory';
import NotFound from './NotFound';
import UserPayments from './Profile/UserPayments';

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
      profilePic: ''
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
    if (adminStatus === true) {
      return adminImage;
    }
    switch (levelId) {
      case 'rookie':
        return rookie;
      case 'bookworm':
        return bookworm;
      case 'voracious':
        return voracious;
      default:
        return rookie;
    }
  }
  /** @description renders the user page
   * @returns {*} users' page
   * @memberof Userpage
   */
  render() {
    const { name, level, email, profilePic, admin } = this.props.user;
    const { authenticated } = this.props.authenticated;
    let profileImage;
    profilePic === '' || profilePic === null ?
      (profileImage = noPicture) : (profileImage = profilePic);
    return (
      <div className="grey lighten-4">
        <TopNav
          levelIcon={this.setLevelIcon(level, admin)}
        />
        <SideNav profileImage={profileImage}
          name={name} email={email}
        />
        <div>
          <Switch>
            <Route exact path={this.props.match.path} component={Library} />
            <Route path="/user/notreturned" component={Outstanding} />
            <Route path="/user/add-book" component={AdminAuth(AddBook)} />
            <Route path="/user/password" component={ChangePassword} />
            <Route exact path="/user/profile" component={Profile} />
            <Route path="/user/edit-profile" component={EditProfile} />
            <Route path="/user/history" component={Borrowed} />
            <Route path="/user/dashboard"
              component={AdminAuth(AdminDashboard)}
            />
            <Route exact path="/user/payments" component={UserPayments} />
            <Route path="/user/:id/edit-book" component={AdminAuth(EditBook)} />
            <Route path="/user/category" component={AdminAuth(AddCategory)} />
            <Route path="/user/new-level" component={ChangeLevel} />
            <Route path="/user/:categories" component={BookCategory} />
            <Route path="/user/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user, authenticated } = state.authReducer;
  return {
    user,
    authenticated
  };
};

export default connect(mapStateToProps, {
})(Userpage);
