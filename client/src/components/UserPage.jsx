import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import AdminAuthentication from './Authentication/AdminAuthentication';
import TopNav from './Common/TopNav';
import SideNav from './Common/SideNav';
import Library from './Library/Library';
import Borrowed from './Library/Borrowed';
import Outstanding from './Library/Outstanding';
import Profile from './Profile/Profile';
import ChangePassword from './Profile/ChangePassword';
import AddBook from './Library/AddBook';
import AddCategory from './Library/AddCategory';
import AdminDashboard from './Dashboard/AdminDashboard';
import EditBook from './Library/EditBook';
import ChangeLevel from './Profile/ChangeLevel';
import BookCategory from './Library/BookCategory';
import NotFound from './NotFound';
import UserPayments from './Profile/UserPayments';
import Footer from './Common/Footer';

import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';
import adminImage from '../assets/images/admin.jpg';
import noPicture from '../assets/images/profile.jpeg';


/** @description component that renders the users page
 *
 * @class UserPage
 *
 * @extends {Component}
 */
export class UserPage extends Component {
  /** @description Creates an instance of UserPage.
   *
     * @param {Object} props
     *
     * @memberof UserPage
     */
  constructor(props) {
    super(props);
    this.userId = '';
    this.setLevelIcon = this.setLevelIcon.bind(this);
  }

  /* eslint-disable class-methods-use-this */
  /** @description sets icon according to a users level
   *
   * @param {string} level
   * @param {boolean} adminStatus
   *
   * @returns {Object} users level icon
   *
   * @memberof UserPage
   */
  setLevelIcon(level, adminStatus) {
    if (adminStatus === true) {
      return adminImage;
    }
    switch (level) {
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
   *
   * @returns {JSX} JSX
   *
   * @memberof UserPage
   */
  render() {
    const { name, level, email, profilePic, admin } = this.props.user;
    const { authenticated } = this.props.authenticated;
    let profileImage;
    profilePic === '' || profilePic === null ?
      (profileImage = noPicture) : (profileImage = profilePic);
    return (
      <div className="grey lighten-4 layout">
        <TopNav
          levelIcon={this.setLevelIcon(level, admin)}
        />
        <SideNav profileImage={profileImage}
          name={name} email={email}
        />
        <div className="content-wrapper">
          <Switch>
            <Route exact path={this.props.match.path} component={Library} />
            <Route exact path="/main/unreturned-books"
              component={Outstanding} />
            <Route exact path="/main/add-book"
              component={AdminAuthentication(AddBook)} />
            <Route exact path="/main/password" component={ChangePassword} />
            <Route exact path="/main/profile" component={Profile} />
            <Route exact path="/main/borrow-history" component={Borrowed} />
            <Route exact path="/main/admin-dashboard"
              component={AdminAuthentication(AdminDashboard)}
            />
            <Route exact path="/main/payment-upload" component={UserPayments} />
            <Route exact path="/main/:id/edit-book"
              component={AdminAuthentication(EditBook)} />
            <Route exact path="/main/category"
              component={AdminAuthentication(AddCategory)} />
            <Route exact path="/main/new-level" component={ChangeLevel} />
            <Route path="/main/category/:categories"
              component={BookCategory} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
/** @description connects the state from the store to the component props
   *
   * @param { Object } state
   *
   * @returns { Object } an object containing user details and
   * a boolean indicating authenticated status
   */
const mapStateToProps = (state) => {
  const { user, authenticated } = state.authReducer;
  return {
    user,
    authenticated
  };
};

export default connect(mapStateToProps, {
})(UserPage);
