import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction.js';
import { passwordChange, displayUserpage } from '../../actions/userAction.js';
import Button from '../Common/Button.jsx';

class ChangePassword extends Component {
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

  componentWillMount() {
    this.props.displayUserpage();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const { userId } = this.props.user;
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.passwordChange(userId, this.state.oldPassword, this.state.newPassword).then(res => {
        if (res) {
          this.props.history.push('/user')
        }
      })
    }else {
      Materialize.toast('Passwords do not match', 4000)
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000, '', () => {
          this.props.clearErrorMessage()
        })
      );
    }
  }
  render() {
    return (
      <div className='row'>
        <div className='card col s10 m8 l6 offset-s1 offset-m2 offset-l4'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <h5 className='indigo-text text-darken-2 center'>CHANGE PASSWORD</h5>
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
                  <input name='confirmNewPassword' type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.confirmNewPassword}
                    required
                  />
                  <label> Confirm new password</label>
                </div>
                <div className='col s6 m4 l6 offset-s3 offset-m4 offset-l3'>
                  <Button type='submit' name='action' label='Change Password' icon='save' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  
  return {
    user
  };
}

export default connect(mapStateToProps, {
  passwordChange, displayUserpage
})(withRouter(ChangePassword));
