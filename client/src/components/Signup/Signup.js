import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ReactDOM from 'react-dom';
import Tab from '../Tab/Tab';
import $ from 'jquery';
import Button from '../Button/Button';
import Login from '../Login/Login';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';

import { signupUser } from '../../actions';



/*function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirmpassword) {
    errors.confirmpassword = 'Please enter your password again to confirm it';
  }

  if (!formProps.username) {
    errors.username = 'Please enter a username';
  }

  if (!formProps.level) {
    error.level = 'Please select a level to proceed';
  }

  if (!formProps.agreed) {
    errors.agreed = 'Please accept agreement to proceed';
  }

  return errors;
}*/

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fireRedirect: false,
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      level: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });

  }

  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ level: event.target.value });

  }

  handleFormSubmit(event) {
    event.preventDefault()

    //this.setState({ fireRedirect: true })
    console.log(this.state);
  }



  /*renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }*/

  render() {
    //const { fireRedirect } = this.state;

    return (
      <div className="row" >
        <div className='col s12 m10 l10 offset-m1'>
          <div className='card front row'>
            <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h5 className='center greeting'>New User? Please fill your details and begin your journey with us!</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className="input-field col s12">
                    <input name="email" type="text" className="validate"
                      onChange={this.handleChange}
                      value={this.state.email} />
                    <label>Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="username" type="text" className="validate"
                      onChange={this.handleChange}
                      value={this.state.username} />
                    <label>Username</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="password" type="text" className="validate"
                      onChange={this.handleChange}
                      value={this.state.password} />
                    <label>Password</label>
                  </div>
                  <div className="input-field col s12">
                    <input name="confirmpassword" type="text" className="validate"
                      onChange={this.handleChange}
                      value={this.state.confirmpassword} />
                    <label>Confirm Password</label>
                  </div>
                  <label>Membership Level</label>
                  <select ref='level' id="level" className="browser-default indigo-text text-darken-2"
                    onChange={this.handleSelectChange}
                    value={this.state.value}>
                    <option defaultValue="halo" disabled selected>Select</option>
                    <option value="rookie" data-icon={rookie} className="left circle">Rookie</option>
                    <option value="bookworm" data-icon={bookworm} className="left circle">Bookworm  N2000/month</option>
                    <option value="voracious" data-icon={voracious} className="left circle">Voracious  N5000/month</option>
                    <option value="admin" data-icon={admin} className="left circle">Admin</option>
                  </select>


                </div>
                <div className="row">
                  <div className="col s12 m4 l4">
                    <Button type="submit" icon='account_box' label="Signup" />
                  </div>
                </div>
                {/*fireRedirect && (
                    <Redirect to={'/user'} />
                  )*/}

              </form>
              <div className='row' >
                <div className="col s6 m4 l4">
                  <p>Or signup with:</p>
                </div>
                <div className="col s12 m4 l6">
                  <Button type="submit" name="action" label="Google plus" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    );
  }
}

/*function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}*/

//export default connect(mapStateToProps, { signupUser })(Signup);

