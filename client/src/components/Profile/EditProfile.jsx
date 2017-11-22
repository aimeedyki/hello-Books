/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayUserpage } from '../../actions/userAction';


import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';
import Button from '../Common/Button.jsx';
import ChangePassword from './ChangePassword.jsx';


/** component that allows a user to edit their profile
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
  /** Creates an instance of EditProfile.
   * @param {any} props
   * @memberof EditProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.userId = '';
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.setLevelIcon = this.setLevelIcon.bind(this);
  }

  /** displays usersdetails
   * @memberof EditProfile
   * @returns {object} users details
   */
  componentWillMount() {
    this.props.displayUserpage();
  }

  /** displays users details
   * @returns {*} void
   * @memberof EditProfile
   */
  componentDidMount() {
    const { username, email, level, userId } = this.props;
    this.setState({
      username,
      email,
      level,
      userId
    });
  }
  /** checks when there is a change and sets it to state
   * @returns {*} void
   * @param {any} event
   * @memberof EditProfile
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** submits the form
   * @returns {*} void
   * @param {any} event
   * @memberof EditProfile
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.changeProfile(this.state).then((res) => {
      if (res) {
        this.props.history.push('/user');
      }
    });
  }

  /* eslint-disable class-methods-use-this */
  /** checks the level and sets the picture
   * @param {any} level
   * @returns {object} picture
   * @memberof EditProfile
   */
  setLevelIcon(level) {
    switch (level) {
      case 'rookie':
        return rookie;
      case 'bookworm':
        return bookworm;
      case 'voracious':
        return voracious;
      case 'admin':
        return admin;
      default:
        return rookie;
    }
  }


  /** renders component
   * @returns {*} component
   * @memberof EditProfile
   */
  render() {
    const { levelicon } = this.state;
    const { username, level, email } = this.props.user;
    return (
      <div className="row">
        <div className='card col s10 m8 l6 offset-s1 offset-m2 offset-l4'
          className='profile'>
          <div className="center">
            <h5 className='indigo-text text-darken-2'>Profile Settings</h5>
            <img className="circle" src='' alt="profile photo" />
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
                    <select id='level'
                      className="icons indigo-text text-darken-2">
                      <option value="" ref="dropdown">Select</option>
                      <option value="rookie" className="left circle">
                        Rookie</option>
                      <option value="bookworm" className="left circle">
                        Bookworm  N2000/month</option>
                      <option value="voracious" className="left circle">
                        Voracious  N5000/month</option>
                      <option value="admin" className="left circle">
                        Admin</option>
                    </select>
                    <label>Change Membership Level</label>
                  </div>
                </div>
                <div>
                  <a className="modal-trigger" href="#changepassword">
                    Change Password?</a>
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
                <Button type="submit" name="action"
                  label="Save changes" icon="save" />
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

/** @param {any} state
 * @returns {object} userdetails
 */
const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, {
  displayUserpage,
})(EditProfile);
