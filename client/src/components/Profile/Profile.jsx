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

/** @description shows the users' profile
 *
 * @class Profile
 *
 * @extends {Component}
 */
export class Profile extends Component {
  /** @description Creates an instance of Profile
   *
   * @param {object} props
   *
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      levelicon: '',
      profilepPic: '',
      imageFile: null,
    };
    this.setLevelIcon = this.setLevelIcon.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
  }

  /** @description uploads image
   *
   * @returns {*} null
   *
   * @param {file} image
   *
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

  /** @description sets image file to state
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof Profile
   */
  imageChange(event) {
    this.setState({
      imageFile: event.target.files[0],
    });
    this.handleImageUpload(event.target.files[0]);
  }

  /** @returns {*} null
   * @memberof Profile
   */
  uploadPic() {
    this.props.changePic(this.state.profilePic);
  }
  /* eslint-disable class-methods-use-this */
  /** @description Chooses the level icon to display based on
   * user's level
   *
   * @param {string} level
   *
   * @returns {*} null
   *
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

  /** @description renders profile component
   *
   * @returns {JSX} JSX
   *
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
      surcharge,
      outstandingSubscription,
      maxDays,
      maxBooks }
      = this.props.user;
    let profileImage;
    profilePic === '' || profilePic === null ?
      (profileImage = noPicture) : (profileImage = profilePic);

    return (
      <div className='row layout-fix'>
        <div className='card center col m8 l4 offset-m2 offset-l5'>
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
            <div className='col s6 details-left'>
              <h6>Surcharge</h6></div>
            <div className='col s6'><p><c>{surcharge}</c></p></div>
            {outstandingSubscription === 0 ? '' :
              <div>
                <div className='col s6 details-left'>
                  <h6>Subscription charge</h6></div>
                <div className='col s6'>
                  <p><c>{outstandingSubscription}</c></p>
                </div>
              </div>
            }
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
                id="send">
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
          <div className="row link-margin">
            <Link to="/main/password"
              className="col s5 link-cursor" >Change password?</Link>
            <span className="col s1 grey-text" >|</span>
            <Link to="/main/new-level"
              className="col s5 link-cursor" >Want a new Level?</Link>
          </div>
          <div className='levelLink'>
            <p>Already paid? Please upload payments
              <Link to="/main/payment-upload"
                className="link-cursor"> here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { object } user details
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, {
  imageUpload, changePic, getUserLevel
})(Profile);
