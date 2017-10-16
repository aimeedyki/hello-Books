/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayUserpage } from '../../actions/userAction';
import { getCategories } from '../../actions/bookAction';

import backpic from '../../assets/images/booksbw2.jpg';
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
    this.props.displayUserpage();
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
    (this.props.level === 'admin') ? adminLinks = (
      <ul>
        <li><NavLink to='/user/notifications' className='white-text'>
          NOTIFICATIONS</NavLink></li>
        <li><NavLink to='/user/category' className='white-text'>
          NEW CATEGORY</NavLink></li>
      </ul>
    ) : adminLinks = '';
    return (
      <div>
        <ul id='slide-out' className='side-nav fixed indigo darken-2'>
          <li>
            <div className='row user-view'>
              <div className='background'>
                <img src={backpic} alt='background' />
              </div>
              <a><img className='circle'
                src={this.props.levelIcon} alt='level icon' /></a>
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
            LIBRARY</NavLink></li>
          <li><NavLink to='/user/history' className='white-text'>
            HISTORY</NavLink></li>
          <li><NavLink to='/user/notreturned' className='white-text'>
            OUTSTANDING</NavLink></li>
          {adminLinks}
          {/* <div className='white'>
            <h5 className='center indigo-text text-darken-2'>Categories</h5>
            <ul className='center'>
              <li >
                <a className='indigo-text text-darken-2' href='#all'>
                  ALL</a></li>
              {this.props.categories.map(category => (
                (
                  <li key={category.id}>
                    <a className='indigo-text text-darken-2' onClick={() => {
                      this.handleClick(category.id, category.category);
                    }} href={`#${category.category}`}>
                      {category.category}</a></li>)
              )
              )}
            </ul>
          </div> */}
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
  const { user } = state.userReducer;
  return {
    categories: state.bookReducer.categories,
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories, displayUserpage
})(withRouter(Sidenav));
