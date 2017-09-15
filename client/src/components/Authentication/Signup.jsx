import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';


import { signupUser, clearErrorMessage } from '../../actions/authAction';

import Button from '../Common/Button.jsx';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      level: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ level: event.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }   
  }

  handleFormSubmit(event) {
    event.preventDefault()
    if (this.state.password === this.state.confirmpassword) {
      this.props.signupUser(this.state).then(res => {
        if (res) {
          this.props.history.push('/user')
        }
      })
      
    } else {
      Materialize.toast('Passwords do not match', 4000)
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
      <div className='row' >
        <div className='col s12 m10 l10 offset-m1'>
          <div className='card front row'>
            <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h5 className='center greeting indigo-text text-darken-2'>New User? Please fill your details and begin your journey with us!</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input name='email' type='email' className='validate'
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                    <label>Email</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='username' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                    <label>Username</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='password' type='password' className='validate'
                      onChange={this.handleChange}
                      value={this.state.password}
                      required
                    />
                    <label>Password</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='confirmpassword' type='password' className='validate'
                      onChange={this.handleChange}
                      value={this.state.confirmpassword}
                      required
                    />
                    <label>Confirm Password</label>
                  </div>
                  <label>Membership Level</label>
                  <select ref='level' id='level' className='browser-default indigo-text text-darken-2'
                    onChange={this.handleSelectChange}
                    value={this.state.value}
                    required>
                    <option defaultValue='' selected disabled>Select a level</option>
                    <option value='rookie'>Rookie</option>
                    <option value='bookworm'  >Bookworm  N2000/month</option>
                    <option value='voracious' >Voracious  N5000/month</option>
                    <option value='admin' >Admin</option>
                  </select>
                </div>
                <div className='row'>
                  <div className='col s12 m4 l4 offset-l4 offset-m4'>
                    <Button type='submit' icon='account_box' label='Signup' />
                  </div>
                </div>
                <p className='center indigo-text text-darken-2'>Already registered? Please login <Link to= '/login'>here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    };
}

export default connect(mapStateToProps, {
  signupUser,
  clearErrorMessage
})(withRouter(Signup));
