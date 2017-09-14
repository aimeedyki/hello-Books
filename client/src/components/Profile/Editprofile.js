import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import photo from '../../assets/images/profilephoto.jpg';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';
import Input from '../Common/Input';
import Button from '../Common/Button';
import ChangePassword from './ChangePassword';

export default class Editprofile extends Component {
  constructor(props) {
    super(props)
  }

  onselect() {

  }
  componentDidMount() {
    const element = ReactDOM.findDOMNode(this.refs.dropdown)
    window.$(element).ready(function () {
      window.$('select').material_select();
    });

    window.$(document).ready(function () {
      window.$('.modal').modal();
    });
  }
  render() {

    return (
      <div className="row">
        <div className=' card col s10 m8 l6 offset-s1 offset-m2 offset-l3'>
          <div className="center">
            <h5 className='indigo-text text-darken-2'>PROFILE SETTINGS</h5>
            <img className="circle" src={photo} alt="profile photo" />
          </div>
          <form>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <div className="input-field ">
                  <Input name="firstname" type="text" label="First name" />
                </div>
                <div className="input-field ">
                  <Input name="lastname" type="text" label="Last name" />
                </div>

                <div className="row">
                  <div className='input-field '>
                    <select id='level' className="icons indigo-text text-darken-2">
                      <option value="" ref="dropdown">Select</option>
                      <option value="rookie" data-icon={rookie} className="left circle">Rookie</option>
                      <option value="bookworm" data-icon={bookworm} className="left circle">Bookworm  N2000/month</option>
                      <option value="voracious" data-icon={voracious} className="left circle">Voracious  N5000/month</option>
                      <option value="admin" data-icon={admin} className="left circle">Admin</option>
                    </select>
                    <label>Change Membership Level</label>
                  </div>
                </div>
                <div>
                  <a className="modal-trigger" href="#changepassword">Change Password?</a>
                </div>
                <div>
                  <p className='grey-text'>Change profile picture</p>
                </div>
                <div className="file-field input-field">
                  <div className="btn indigo darken-2">
                    <span>Browse</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <Button type="submit" name="action" label="Save changes" icon="save" />
              </div>
            </div>
          </form>
        </div>
        <div className="modal" id="changepassword">
          <ChangePassword />
        </div>
      </div>
    );
  }
}
