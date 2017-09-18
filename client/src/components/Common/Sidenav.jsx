import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import backpic from '../../assets/images/booksbw2.jpg';

export default class Sidenav extends Component {
  componentDidMount() {
    window.$(document).ready(function () {
      window.$('.button-collapse').sideNav({
        menuWidth: 200,
      });
    });
  }
  render() {

    return (
      <div>
        <ul id='slide-out' className='side-nav fixed indigo darken-2'>
          <li>
            <div className='user-view'>
              <div className='background'>
                <img src={backpic} alt='background' />
              </div>
              <a href='#!user'><img className='circle' src={this.props.levelIcon} alt='level icon' /></a>
              <a href='#!name'><span className='white-text name'>@{this.props.username}</span></a>
              <a href='#!email'><span className='white-text email'>{this.props.email}</span></a>
            </div>
          </li>
          <li><NavLink to='/user' className='white-text active'>LIBRARY</NavLink></li>
          <li><NavLink to='/user/history' className='white-text'>HISTORY</NavLink></li>
          <li><NavLink to='/user/notreturned' className='white-text'>OUTSTANDING</NavLink></li>
          <li><NavLink to='/user/profile' className='white-text'>PROFILE SETTINGS</NavLink></li>
          <li><NavLink to='/user/notifications' className='white-text'>NOTIFICATIONS</NavLink></li>
          <li><NavLink to='/user/category' className='white-text'>NEW CATEGORY</NavLink></li>
        </ul>
        <a href='#' data-activates='slide-out' className='button-collapse'><i className='material-icons'>menu</i></a>
      </div>
    );
  }
}
