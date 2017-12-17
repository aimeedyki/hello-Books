import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { signupUser, clearErrorMessage } from '../../actions/authAction';

import Button from '../Common/Button.jsx';
/** sign up form
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {
  /** Creates an instance of Signup.
   * @param {*} props
   * @memberof Signup
   */
  constructor(props) {
    super(props);
    this.errorMessage = '';
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.googleSignup = this.googleSignup.bind(this);
  }
  /** sets the state to the value of the field
     * @returns {*} null
     * @param {*} event
     * @memberof Signup
     */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** starts the method that displays error messages
     * @returns {*} void
     * @param {any} prevProps
     * @memberof Signup
     */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** signs up a user when form is submitted
      * @returns {*} void
      * @param {any} event
      * @param {any} res
      * @memberof Signup
      */
  handleFormSubmit(event, res) {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.signupUser(this.state)
        .then((res) => {
          if (res) {
            this.props.history.push('/main');
          }
        });
    } else {
      Materialize.toast('Passwords do not match', 4000, 'indigo darken-2');
    }
  }
  /**
   * @returns {*} void
   * @param {any} response 
   * @memberof Signup
   */
  googleSignup(response) {
    const {
      email, givenName, familyName, googleId, imageUrl } = response.profileObj;
    const username = givenName + googleId;
    this.props.signupUser({
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
    if (response.error) {
      Materialize
        .toast('Please resume google signup or fill signup form', 4000, ''
        );
    }
  }
  /** displays error message
     * @returns {string} error message
     * @memberof Signup
     */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000, '', () => {
          this.props.clearErrorMessage();
        })
      );
    }
  }
  /** renders signup form
     * @returns {*} signup component
     * @memberof Signup
     */
  render() {
    return (
      <div className="row" >
        <div className="col s12 m10 l10 offset-m1">
          <div className="card front-signup row">
            <div className="col s10 m10 l8 offset-m1 offset-s1 offset-l2">
              <h4 className="center greeting indigo-text text-darken-2">
                New User? Join Us!
              </h4>
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className="input-field  col s12">
                    <input name="email" type="email"
                      className="validate black-text"
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="username" type="text"
                      className="validate black-text"
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                    <label>Username</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="name" type="text"
                      className="validate black-text"
                      onChange={this.handleChange}
                      value={this.state.name}
                      required
                    />
                    <label>Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="password" type="password"
                      className="validate black-text"
                      onChange={this.handleChange}
                      value={this.state.password}
                      required
                    />
                    <label>Password</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="confirmPassword" type="password"
                      className="validate black-text"
                      onChange={this.handleChange}
                      value={this.state.confirmPassword}
                      required
                    />
                    <label>Confirm Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m4 l4 offset-l4 offset-m4">
                    <Button type="submit" icon="account_box" label="Signup" />
                  </div>
                </div>
                <div className="center login-button">
                  <GoogleLogin
                    clientId={CLIENT_ID}
                    onSuccess={this.googleSignup}
                    onFailure={this.googleSignup}>
                    <i className="fa fa-google-plus google-icon"
                      aria-hidden="true" />
                    <span className="google-text">Login with google</span>
                  </GoogleLogin>
                </div>
                <p className="center indigo-text text-darken-2">
                  Already registered? Please login
                  <Link to="/login"> here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Signup.PropTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  signupUser: PropTypes.func,
  clearErrorMessage: PropTypes.func
};

const mapStateToProps = state => (
  {
    errorMessage: state.authReducer.error,
  }
);

export default connect(mapStateToProps, {
  signupUser,
  clearErrorMessage
})(withRouter(Signup));
