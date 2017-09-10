import React, { Component } from 'react';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Login from '../Login/Login';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
      level: '',
      agreed: '',
      fireRedirect: false
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(event) {
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
  }

  submitHandler(event) {
    event.preventDefault()
    this.setState({ fireRedirect: true })
  }
  render() {
    const { fireRedirect } = this.state
    return (
      <div className="row">
        <div className='col s12 m12 l12 offset-m1'>
          <div className='card front'>
            <div className='row'>
              <div className='col s10 m10 l10 offset-m1 offset-s1 offset-l1'>
                <h5 className='center greeting'>New User? Please fill your details and begin your journey with us!</h5>
                <form onSubmit={this.submitHandler}>
                  <div className='row'>
                    <div className="input-field col s6">
                      <Input name="firstname" type="text" label="First Name" />
                    </div>
                    <div className="input-field col s6">
                      <Input name="lastname" type="text" label="Last Name" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <Input className='col s6' name="email" type="text" label="Email" />
                    </div>
                    <div className="input-field col s6">
                      <Input className='col s6' name="username" type="text" label="Username" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <Input className='col s6' name="password" type="text" label="Password" />
                    </div>
                    <div className="input-field col s6">
                      <Input className='col s6' name="confirmpassword" type="text" label="Confirm Password" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m6 l6">
                      <select id='level' className="icons indigo-text text-darken-2">
                        <option value="" disabled selected>Select</option>
                        <option value="rookie" data-icon={rookie} className="left circle">Rookie</option>
                        <option value="bookworm" data-icon={bookworm} className="left circle">Bookworm  N2000/month</option>
                        <option value="voracious" data-icon={voracious} className="left circle">Voracious  N5000/month</option>
                        <option value="admin" data-icon={admin} className="left circle">Admin</option>
                      </select>
                      <label>Membership Level</label>
                    </div>
                    <p className='col s12 m6 l6'>
                      <input type="checkbox" id="agreed" />
                      <label>"By checking this box, you agree to our Terms & Conditions"</label>
                    </p>
                  </div>
                  <div className="row">
                    <div className="col s12 m4 l4">
                      <Button type="submit" name="action" icon='account_box' label="Signup"/>
                    </div>
                  </div>
                  {fireRedirect && (
                    <Redirect to={'/user'} />
                  )}
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
        </div>
      </div>
    );
  }
}
