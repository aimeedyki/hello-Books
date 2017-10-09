/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import backpic from '../../assets/images/booksbw2.jpg';
/** side navigation on the user page
 * @export
 * @class Sidenav
 * @extends {Component}
 */
export default class Sidenav extends Component {
  /* eslint-disable class-methods-use-this */
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
                @{this.props.username}</span></a>
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
        </ul>
        <a href='#' data-activates='slide-out' className='button-collapse'>
          <i className='material-icons'>menu</i></a>
      </div>
    );
  }
}
