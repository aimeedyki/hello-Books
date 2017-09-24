import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayUserpage } from '../../actions/userAction.js';

import photo from '../../assets/images/profilephoto.jpg';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import admin from '../../assets/images/admin.jpg';

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userId: '',
      level: '',
      levelicon: ''
    };
    this.setLevelIcon = this.setLevelIcon.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentWillMount() {
    this.props.displayUserpage();
  }

  componentDidMount() {
    const { username, email, level, userId } = this.props;
    this.setState({
      username,
      email,
      level,
      userId
    });
  }

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
  
  handleEdit(){
    this.props.history.push('/user/edit-profile')
  }

  handlePassword(){
    this.props.history.push('/user/password')
  }
  render(){
    const { levelicon } = this.state;
    const { username, level, email } = this.props.user;
    return (
      <div className='row'>
        <div className='card col s8 m6 l4 offset-s2 offset-m3 offset-l4'>
          <div className=''>
            <div className="center indigo-text text-darken-2">
              <img className="circle" src={this.setLevelIcon(level)} alt="profile photo"/>
              <h4>Username: {username}</h4>
              <h5>Level: {level}</h5>
              <p>Email: {email}</p>
              <a onClick = {this.handlePassword}>Change password?</a>
            </div>
            <a onClick = {this.handleEdit} className="btn-floating btn-large waves-effect waves-light right indigo darken-2"><i className="material-icons">edit</i></a>
          </div>    
        </div>
      </div>    
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.userReducer;
  return {
    user
  };
}

export default connect(mapStateToProps, {
  displayUserpage,
})(Profile);
