/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayUserpage, changePic } from '../../actions/userAction';
import { imageUpload } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';

/** shows the users' profile
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /** Creates an instance of Profile.
   * @param {any} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userId: '',
      level: '',
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

  /** @returns {*} userdetails
   * @memberof Profile
   */
  componentWillMount() {
    this.props.displayUserpage();
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
    const { userId } = this.props.user;
    this.props.changePic(userId, this.state.profilepic)
      .then((res) => {
        if (res) {
          /* eslint-disable no-undef */
          Materialize.toast('Profile picture changed successfully!!', 4000);
        }
      });
  }
  /* eslint-disable class-methods-use-this */
  /** @param {any} level
   * @returns {?*} level icon
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
      case 'admin':
        return admin;
      default:
        return rookie;
    }
  }


  /** @returns {*} void
   * @memberof Profile
   */
  handleEdit() {
    this.props.history.push('/user/edit-profile');
  }

  /** @returns {*} void
   * @memberof Profile
   */
  handlePassword() {
    this.props.history.push('/user/password');
  }
  /** @returns {*} void
   * @memberof Profile
   */
  handleLevel() {
    this.props.history.push('/user/new-level');
  }
  /** renders profile component
   * @returns {*} component
   * @memberof Profile
   */
  render() {
    const { levelicon } = this.state;
    const { username, level, email, max, profilepic } = this.props.user;
    let profileImage;
    /* eslint-disable no-unused-expressions */
    (profilepic === '' || profilepic === null) ?
      (profileImage = this.setLevelIcon(level)) : profileImage = profilepic;
    return (
      <div className='row'>
        <div className='card col s8 m6 l4 offset-s2 offset-m3 offset-l5'
          className='profile grey'>
          <div className=''>
            <div className='center black-text'>
              <img className='circle photo'
                src={profileImage} alt='profile photo' />
              <div className='row margin-fix'>
                <div className='col s6 details'>
                  <div><h6>Username</h6></div>
                  <div><p><c>{username}</c></p></div>
                </div>
                <div className='col s6 details'>
                  <div><h6>Level</h6></div>
                  <div><p><c>{level}</c></p></div>
                </div>
                <div className='col s12 center details'>
                  <div><h6>Email</h6></div>
                  <div><p><c>{email}</c></p></div>
                </div>
                <div className='col s6 details'>
                  <div><h6>Maximum books allowed</h6></div>
                  <div><p><c>{max}</c></p></div>
                </div>
                <div className='col s6 details'>
                  <div><h6>Maximum returns days</h6></div>
                  <div><p><c>{max}</c></p></div>
                </div>
              </div>
              <div className=' row file-field input-field'>
                <div className='col l5 btn black'>
                  <span>Change photo</span>
                  <input type='file' onChange={this.imageChange}
                    name='imageFile' />
                </div>
                <div className='col l5 file-path-wrapper'>
                  <input className='file-path validate' type='text' />
                </div>
                <a onClick={this.uploadPic}
                  className='btn-floating btn-large waves-effect waves-light'
                  className=' black'>
                  <i className='material-icons left'>save</i></a>

              </div>
              <div>
                <a onClick={this.handlePassword}>Change password?</a>
              </div>
              <div className='levelLink'>
                <a onClick={this.handleLevel}>Want a new Level?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, {
  displayUserpage, imageUpload, changePic
})(Profile);
