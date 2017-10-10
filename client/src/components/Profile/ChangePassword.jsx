/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { passwordChange, displayUserpage } from '../../actions/userAction';
import Button from '../Common/Button.jsx';

/** component to change password
 * @class ChangePassword
 * @extends {Component}
 */
class ChangePassword extends Component {
  /** Creates an instance of ChangePassword.
   * @param {any} props
   * @memberof ChangePassword
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      confirmNewPassword: '',
      newPassword: '',
      userId: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }
  /** @returns {*} void
   * @memberof ChangePassword
   */
  componentWillMount() {
    this.props.displayUserpage();
  }
  /** @returns {*} void
   * @param {any} prevProps
   * @memberof ChangePassword
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** @returns {*} void
   * @param {any} event
   * @memberof ChangePassword
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** @returns {*} void
   * @param {any} event
   * @memberof ChangePassword
   */
  handleFormSubmit(event) {
    event.preventDefault();
    const { userId } = this.props.user;
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.passwordChange(userId, this.state.oldPassword,
        this.state.newPassword)
        .then((res) => {
          if (res) {
            /* eslint-disable no-undef */
            Materialize.toast('Password changed successfully!!', 4000);
            this.props.history.push('/user');
          }
        });
    } else {
      Materialize.toast('Passwords do not match', 4000);
    }
  }
  /** @returns {*} error message
   * @memberof ChangePassword
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
  /** @returns {*} component
   * @memberof ChangePassword
   */
  render() {
    return (
      <div className='row'>
        <div className='card profile col s10 l4 offset-s1 offset-l5'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <h5 className='indigo-text text-darken-2 center'>
                  Change password</h5>
                <div className='input-field col s12'>
                  <input name='oldPassword' type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.oldPassword}
                    required
                  />
                  <label>Old password</label>
                </div>
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
                    label='Change Password' icon='save' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.userReducer;

  return {
    user,
    errorMessage: state.userReducer.error
  };
};

export default connect(mapStateToProps, {
  passwordChange, displayUserpage, clearErrorMessage
})(withRouter(ChangePassword));
