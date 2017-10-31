/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/bookAction';

import BookCategory from '../Library/Bookcategory.jsx';

/** side navigation on the user page
 * @export
 * @class Sidenav
 * @extends {Component}
 */
class Sidenav extends Component {
  /* eslint-disable class-methods-use-this */
  /** calls methods that gets all categories
 * @returns {*} void
 * @memberof Tab
 */
  componentWillMount() {
    this.props.getCategories();
  }
  /** @returns {*} void
   * @memberof Sidenav
   */
  componentDidMount() {
    window.$(document).ready(() => {
      window.$('.button-collapse').sideNav({
        menuWidth: 200,
      });
    });
  }
  /** displays side navigation on user page
   * @returns {*} side nav
   * @memberof Sidenav
   */
  render() {
    let adminLinks;
    /* eslint-disable no-unused-expressions */
    // conditionally render navigation links depending on user level
    (this.props.user.admin === true) ? adminLinks = (
      <ul>
        <li><NavLink to='/user/notifications' className='white-text'>
          Notifications</NavLink></li>
        <li><NavLink to='/user/category' className='white-text'>
          New Category</NavLink></li>
      </ul>
    ) : adminLinks = '';
    const cloud = 'http://res.cloudinary.com/ddxsazo2k/image/upload';

    return (
      <div>
        <ul id='slide-out' className='side-nav fixed indigo darken-2'>
          <li>
            <div className='row user-view'>
              <div className='background'>
                <img src={`${cloud}/v1509441598/booksbw2_emnjkv.jpg`}
                  alt='background' />
              </div>
              <a><img className='circle'
                src={this.props.profileImage} alt='level icon' /></a>
              <a><span className='col s10 white-text name'>
                Hello {this.props.username}!</span></a>
              <Link to='/user/profile'><span><i
                className="col s2 material-icons">
                settings</i></span></Link>
              <a><span className='white-text email'>
                {this.props.email}</span></a>
            </div>
          </li>
          <li><NavLink to='/user' className='white-text active'>
            Library</NavLink></li>
          <li><NavLink to='/user/history' className='white-text'>
            History</NavLink></li>
          <li><NavLink to='/user/notreturned' className='white-text'>
            Outstanding</NavLink></li>
          {adminLinks}
          <div className='white cat'>
            <h5 className='cat-head indigo-text text-darken-2'>Categories</h5>
            <ul>
              {this.props.categories.map(category => (
                (
                  <li key={category.id}>
                    <NavLink
                      to={`/user/${category.id}/${category.name}/category`}
                      className='indigo-text text-darken-2'>
                      {category.name}</NavLink></li>)
              )
              )}
            </ul>
          </div>
        </ul>
        <a href='#' data-activates='slide-out'
          className='button-collapse fixed'>
          <i className='material-icons'>menu</i></a>
      </div>
    );
  }
}

// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    categories: state.bookReducer.categories,
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories
})(withRouter(Sidenav));
