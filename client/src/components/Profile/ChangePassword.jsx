/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { passwordChange, } from '../../actions/userAction';
import Button from '../Common/Button.jsx';

/** component to change password
 * @class ChangePassword
 * @extends {Component}
 */
class ChangePassword extends Component {
  /** Creates an instance of ChangePassword.
   * @param {*} props
   * @memberof ChangePassword
   */
  constructor(props) {
    super(props);
    this.state = {
      confirmNewPassword: '',
      newPassword: '',
      userId: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePage = this.closePage.bind(this);
  }
  /** @returns {*} null
   * @param {*} prevProps
   * @memberof ChangePassword
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** @returns {*} null
   * @param {any} event
   * @memberof ChangePassword
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** @returns {*} null
   * @param {*} event
   * @memberof ChangePassword
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.passwordChange(this.state.newPassword,
        this.state.confirmNewPassword)
        .then((response) => {
          if (response) {
            this.props.history.push('/user');
          }
        }).catch((error) => {
          if (error) {
            Materialize.toast(error.message, 4000, 'indigo darken-2');
          }
        });
    } else {
      Materialize.toast('Passwords do not match', 4000, 'indigo darken-2');
    }
  }
  /**
   * @returns {*} null
   * @memberof ChangePassword
   */
  closePage() {
    this.props.history.push('/user/profile');
  }
  /** @returns {*} component
   * @memberof ChangePassword
   */
  render() {
    return (
      <div className='row'>
        <div className='card profile col s10 l4 offset-s1 offset-l5'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <i className="material-icons red-text right close link-cursor"
                onClick={this.closePage}>
                close</i>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <h5 className='indigo-text text-darken-2 greeting center'><b>
                  Change password</b></h5>
                <div className='input-field col s12'>
                  <input name='newPassword' type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.newPassword}
                    required
                  />
                  <label>New password</label>
                </div>
                <div className='input-field col s12'>
                  <input name='confirmNewPassword'
                    type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.confirmNewPassword}
                    required
                  />
                  <label> Confirm new password</label>
                </div>
                <div className='center'>
                  <Button type='submit' name='action'
                    label='Change' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { error } = state.userReducer;
  return {
    user,
    errorMessage: error
  };
};

export default connect(mapStateToProps, {
  passwordChange, clearErrorMessage
})(withRouter(ChangePassword));
