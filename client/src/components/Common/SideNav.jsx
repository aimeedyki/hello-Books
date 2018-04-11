import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/bookAction';

import BookCategory from '../Library/BookCategory.jsx';

/** @description side navigation on the user page
 *
 * @class SideNav
 *
 * @extends {Component}
 */
export class SideNav extends Component {
  /** @description gets the categories to display on nav
   * and initializes the side navigation
   * 
   * @returns { * } null
   *
   * @memberof SideNav
   */
  componentDidMount() {
    this.props.getCategories();
    $(document).ready(() => {
      $('.button-collapse').sideNav({
        menuWidth: 200,
      });
    });
  }

  /** @description displays side navigation on user page
   *
   * @returns { JSX } JSX
   *
   * @memberof SideNav
   */
  render() {
    let adminLinks;

    // conditionally render navigation links depending on user level
    (this.props.user.admin === true) ? adminLinks = (
      <ul>
        <li><NavLink to="/main/admin-dashboard" className="white-text">
          Admin Dashboard</NavLink></li>
      </ul>
    ) : adminLinks = '';

    const pictureUrl = 'https://res.cloudinary.com/ddxsazo2k/image/upload';

    return (
      <div className="grey lighten-4">
        <ul id="slide-out" className="side-nav fixed indigo darken-2">
          <li>
            <div className="row user-view">
              <div className="background">
                <img src={`${pictureUrl}/v1509441598/booksbw2_emnjkv.jpg`}
                  alt="background" />
              </div>
              <a><img className="circle"
                src={this.props.profileImage} alt="level icon" /></a>
              <a><span className="col s10 white-text name side-email">
                Hello {this.props.name}!</span></a>
              <Link to="/main/profile"><span><i
                className="col s2 material-icons">
                settings</i></span></Link>
              <a><span className="white-text email side-email">
                {this.props.email}</span></a>
            </div>
          </li>
          <li><NavLink to="/main" className="white-text active">
            Library</NavLink></li>
          <li><NavLink to="/main/borrow-history" className="white-text">
            Borrow History</NavLink></li>
          <li><NavLink to="/main/unreturned-books" className="white-text">
            Unreturned Books</NavLink></li>
          {adminLinks}
          <div className="white cat">
            <h5 className="cat-head indigo-text text-darken-2">Categories</h5>
            {!this.props.categories ? <p className="blue-text center">
              No categories yet!</p> :
              <ul>
                {this.props.categories.map(category => (
                  (
                    <li key={category.id}>
                      <NavLink
                        to={`/main/category/${category.id}/${category.name}/`}
                        className="indigo-text text-darken-2">
                        {category.name}</NavLink></li>)
                )
                )}
              </ul>}
          </div>
        </ul>
        <a href="#" data-activates="slide-out"
          className="button-collapse fixed">
          <i className="material-icons">menu</i></a>
      </div>
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state 
   *
   * @returns { array } categories
   * @returns { object } user details
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { categories } = state.categoryReducer;
  return {
    categories,
    user
  };
};

export default connect(mapStateToProps, {
  getCategories
})(withRouter(SideNav));
