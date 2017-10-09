/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/authAction';


/** displays the top navigation of the user page
 * @class Topnav
 * @extends {Component}
 */
class Topnav extends Component {
  /** Creates an instance of Topnav.
     * @param {any} props 
     * @memberof Topnav
     */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /** Logs out user
     * @param {any} event 
     * @memberof Topnav
     * @returns {*} void
     */
  logout(event) {
    event.preventDefault();
    this.props.logoutUser();
  }
  /** @returns {object} element
   * @memberof Topnav
   */
  render() {
    return (
      <div className='row'>
        <div className="col s12 navbar-fixed white">
          <nav>
            <div className="nav-wrapper white">
              <a href="#!"
                className="brand-logo left col l3 offset-l2"
                className=" indigo-text text-darken-2">
                <b>Booksville</b></a>
              <ul className="right">
                <li>
                  <h5 className='indigo-text text-darken-2 hello'>
                    Hello {this.props.username}!</h5>
                  <div className="row valign-wrapper">
                    <div className='col s4 m5 l5'>
                      <img className='circle level-icon responsive-img'
                        src={this.props.levelicon} />
                    </div>
                  </div>
                </li>
                <li>
                  <div className='col s1 m1 l1' />
                </li>
                <li><Link to="/" onClick={this.logout}
                  className="indigo-text text-darken-2">Log out</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => (
  state
);
export default connect(mapStateToProps, { logoutUser })(Topnav);
