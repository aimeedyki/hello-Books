/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  changePic,
  getUserLevel
} from '../../actions/userAction';

import { imageUpload } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';
import noPicture from '../../assets/images/profile.jpeg';

/** shows the users' profile
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /** Creates an instance of Profile.
   * @param {*} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      levelicon: '',
      profilepic: '',
      imageFile: null,
    };
    this.setLevelIcon = this.setLevelIcon.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
  }

  /** calls the function to display error if there is an error
     * @returns {*} void
     * @param {any} prevProps
     * @memberof Login
     */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** @returns {*} void
   * @param {any} image
   * @memberof Profile
   */
  handleImageUpload(image) {
    this.props.imageUpload(image)
      .end((error, response) => {
        this.setState({
          profilepic: response.body.secure_url,
          imageFile: null,
        });
      });
  }
  /** @returns {*} void
   * @param {any} event
   * @memberof Profile
   */
  imageChange(event) {
    this.setState({
      imageFile: event.target.files[0],
    });
    this.handleImageUpload(event.target.files[0]);
  }

  /** @returns {*} void
   * @memberof Profile
   */
  uploadPic() {
    this.props.changePic(this.state.profilepic);
  }
  /* eslint-disable class-methods-use-this */
  /** @param {string} level
   * @returns {*} level icon
   * @memberof Profile
   */
  setLevelIcon(level) {
    switch (level) {
      case 'rookie':
        return rookie;
      case 'bookworm':
        return bookworm;
      case 'voracious':
        return voracious;
      default:
        return rookie;
    }
  }
  /** @returns {*} null
   * @memberof Profile
   */
  handleEdit() {
    this.props.history.push('/user/edit-profile');
  }
  /** @returns {*} null
   * @memberof Profile
   */
  handlePassword() {
    this.props.history.push('/user/password');
  }
  /** @returns {*} null
   * @memberof Profile
   */
  handleLevel() {
    this.props.history.push('/user/new-level');
  }
  /** displays error
     * @returns {string} error message
     * @memberof Login
     */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        /* eslint-disable no-undef */
        Materialize.toast(
          this.props.errorMessage, 4000,
          'indigo darken-2', () => {
            this.props.clearErrorMessage();
          }
        )
      );
    }
  }
  /** renders profile component
   * @returns {*} component
   * @memberof Profile
   */
  render() {
    const { levelicon } = this.state;
    const {
      name,
      level,
      levelId,
      email,
      borrowCount,
      profilePic,
      maxDays,
      maxBooks }
      = this.props.user;
    let profileImage;
    /* eslint-disable no-unused-expressions */
    profilePic === '' || profilePic === null ?
      (profileImage = noPicture) : (profileImage = profilePic);

    return (
      <div className='row'>
        <div className='card center col l4 offset-l5'>
          <div className='indigo darken-2'>
            <div className='user'>
              <img className='circle photo'
                src={profileImage} alt='profile photo' />
              <h5 >{name}</h5>
            </div>
          </div>
          <div className='row'>
            <div className='col s12'>
              <div className='col s6 details-left'><h6>Level</h6></div>
              <div className="row col s6 valign-wrapper profile-level-icon">
                <p><c>{level}</c></p>
                <img className='circle responsive-img'
                  src={this.setLevelIcon(level)} />
              </div>
            </div>
            <div className='col s12'>
              <div className='col s6 details-left'><h6>Email</h6></div>
              <div className='col s6 email-fix'><p><c>{email}</c></p></div>
            </div>
            <div className='col s6 details-left'>
              <h6>Maximum books allowed</h6></div>
            <div className='col s6'><p><c>{maxBooks}</c></p></div>
            <div className='col s6 details-left'>
              <h6>Maximum returns days</h6></div>
            <div className='col s6'><p><c>{maxDays}</c></p></div>
            <div className='col s6 details-left'>
              <h6>Books Borrowed</h6></div>
            <div className='col s6'><p><c>{borrowCount}</c></p></div>
          </div>
          <div className='row'>
            <div className='col s9'>
              <div className=' row file-field input-field'>
                <div className='col l8 btn indigo darken-2'>
                  <span>Change photo</span>
                  <input type='file' onChange={this.imageChange}
                    name='imageFile' />
                </div>
                <div className='col l4 file-path-wrapper'>
                  <input className='file-path validate' type='text' />
                </div>
              </div>
            </div>
            <div className='col s3'>
              <a onClick={this.uploadPic}
                className='btn-floating btn-large waves-effect waves-light'
                className=' black'>
                <i className='material-icons medium left link-cursor'>
                  send</i></a>
            </div>
          </div>
          <div className="image-container center">
            {(this.state.imageFile && !this.state.profilepic) ?
              <p className="center">Uploading ....</p> : ''}
            {this.state.profilepic &&
              <img src={this.state.profilepic} alt="profile picture" />
            }
          </div>
          <div className='link-cursor'>
            <a onClick={this.handlePassword}>Change password?</a>
          </div>
          <div className='levelLink link-cursor'>
            <a onClick={this.handleLevel}>Want a new Level?</a>
          </div>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, {
  imageUpload, changePic, getUserLevel
})(Profile);
