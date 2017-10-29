/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { signinUser, clearErrorMessage } from '../../actions/authAction';

import Button from '../Common/Button.jsx';
/** @class Login
 * @extends {Component}
 */
class Login extends Component {
  /** Creates an instance of Login.
   * @param {any} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /** sets changed field to state
     * @returns {*} void
     * @param {any} event
     * @memberof Login
     */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** calls the function to display error if there is an error
     * @returns {*} void
     * @param {any} prevProps
     * @memberof Login
     */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** submits the login form
     * @returns {*} void
     * @param {any} event
     * @memberof Login
     */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props
      .signinUser(this.state)
      .then((res) => {
        if (res) {
          this.props.history.push('/user');
        }
      });
  }
  /** displays error
     * @returns {string} error message
     * @memberof Login
     */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        /* eslint-disable no-undef */
        Materialize.toast(this.props.errorMessage, 4000,
          'indigo darken-2', () => {
            this.props.clearErrorMessage();
          })
      );
    }
  }
  /** renders login form component
     * @returns {*} void
     * @memberof Login
     */
  render() {
    return (
      <div className="row">
        <div className='col s12 m10 l8 offset-m1 offset-l1'>
          <div className='card front row signin'>
            <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h4 className='center greeting indigo-text text-darken-2'>
                Welcome back! Login to continue</h4>
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className='input-field col s12'>
                    <input name='username' type='text'
                      className='validate black-text'
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                    <label>Username</label>
                  </div>
                </div>
                <div className='input-field col s12'>
                  <input name='password' type='password'
                    className='validate black-text'
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="row">
                  <div className="input-field col s4 offset-s3">
                    <Button type="submit" name="action" label="Login" icon="" />
                  </div>
                </div>
                <p className=' center indigo-text text-darken-2'>
                  Not registered yet?</p>
                <p className=' center indigo-text text-darken-2'>
                  Please sign up <Link to='/signup'>here</Link> to continue</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  signinUser: PropTypes.func,
  clearErrorMessage: PropTypes.func
};
const mapStateToProps = state => ({
  errorMessage: state.auth.error
});

export default connect(mapStateToProps, {
  signinUser,
  clearErrorMessage
})(withRouter(Login));

