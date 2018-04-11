
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authAction';

/** @description displays top navigation for the user page
   * 
   * @param { object } props 
   * 
   * @returns { JSX } JSX
   */
export default (props) => {
  /** @description Logs out user
   *
   * @memberof TopNav
   *
   * @returns {*} null
   */
  const logout = () => {
    logoutUser();
  };
  return (
    <div className='row grey lighten-4'>
      <div className="col s12 navbar-fixed white">
        <nav>
          <div className="nav-wrapper white user-logo">
            <Link to="/"
              className="brand-logo link-cursor left col l3 offset-l2">
              <b>Booksville</b></Link>
            <ul className="right">
              <li>
                <div className="row valign-wrapper level-icon">
                  <div className='col s4 m5 l5'>
                    <img className='circle level-icon responsive-img'
                      src={props.levelIcon} />
                  </div>
                </div>
              </li>
              <li>
                <div className='col s1 m1 l1' />
              </li>
              <li><Link to="/" onClick={logout()}
                className="indigo-text text-darken-2">Log out</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
