import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { signinUser, clearErrorMessage } from '../../actions';

import Button from '../Common/Button';



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      fireRedirect: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.signinUser(this.state)
    this.props.history.push('/user');
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
      <div className="row">
        <div className='col s12 m10 l10 offset-m1'>
          <div className='card front row'>
            <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h5 className='center'>Welcome back! Login to continue</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className='input-field col s12'>
                    <input name='username' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                    <label>Username</label>
                  </div>
                </div>
                <div className="row">
                  <input name='password' type='password' className='validate'
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <Button type="submit" name="action" label="Login" icon="" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default connect(mapStateToProps, {
  signinUser,
  clearErrorMessage
})(withRouter(Login));

