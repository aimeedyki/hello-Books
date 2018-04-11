import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { signinUser, clearErrorMessage } from '../../actions/authAction';

import Button from '../Common/Button.jsx';

/** @description Logs in a user
 *
 * @class Login
 *
 * @extends {Component}
 */
export class Login extends Component {
  /** @description Creates an instance of Login.
   *
   * @param {object} props
   *
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
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  /** @description sets changed field to state
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof Login
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description calls the function to display error if there is an error
   *
   * @returns {*} null
   *
   * @param {object} prevProps
   *
   * @memberof Login
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  /** @description submits the login form
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof Login
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props
      .signinUser(this.state)
      .then((res) => {
        if (res) {
          this.props.history.push('/main');
        }
      });
  }

  /** @description handles login through google authentication
   *
   * @returns {*} null
   *
   * @param {object} response
   *
   * @memberof Login
   */
  handleGoogleLogin(response) {
    if (response.error) {
      return Materialize
        .toast('Please resume google login', 4000, ''
        );
    }
    const {
      email, givenName, familyName, googleId, imageUrl } = response.profileObj;
    const username = givenName + googleId;
    this.props.signinUser({
      email,
      username,
      name: givenName,
      password: familyName,
      googleId,
      profilePic: imageUrl
    }).then((res) => {
      if (res) {
        this.props.history.push('/main');
      }
    });
  }

  /** @description displays signup error
     *
     * @returns {string} error message
     *
     * @memberof Login
     */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000,
          'indigo darken-2', () => {
            this.props.clearErrorMessage();
          })
      );
    }
  }

  /** @description renders login form component
   *
    * @returns {*} null
    *
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
                <div className="center login-button">

                  <GoogleLogin
                    clientId={CLIENT_ID}
                    onSuccess={this.handleGoogleLogin}
                    onFailure={this.handleGoogleLogin}
                  >
                    <i className="fa fa-google-plus google-icon"
                      aria-hidden="true" />
                    <span className="google-text">Login with google</span>
                  </GoogleLogin>
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

/** @description connect the state from the store to the component props
   *
   * @param {object} state
   *
   * @returns {string} error message
   */
const mapStateToProps = state => ({
  errorMessage: state.authReducer.error
});

export default connect(mapStateToProps, {
  signinUser,
  clearErrorMessage
})(withRouter(Login));

