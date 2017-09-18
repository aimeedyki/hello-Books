import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';



import { signinUser, clearErrorMessage } from '../../actions/authAction';

import Button from '../Common/Button.jsx';



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      
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
    this.props.signinUser(this.state).then(res => {
      if (res) {
        this.props.history.push('/user')
      }
    })

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
        <div className='col s12 m10 l8 offset-m1 offset-l1'>
          <div className='card front row signin'>
            <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h5 className='center indigo-text text-darken-2'>Welcome back! Login to continue</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className='input-field col s12'>
                    <input name='username' type='text' className='validate black-text'
                      onChange={this.handleChange}
                      value={this.state.username}
                      required
                    />
                    <label>Username</label>
                  </div>
                </div>
                <div className='input-field col s12'>
                  <input name='password' type='password' className='validate black-text'
                    onChange={this.handleChange}
                    value={this.state.password}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="row">
                  <div className="input-field col s4 offset-s3">
                    <Button type="submit" name="action" label="Login" icon="" />
                  </div>
                </div>
                <p className=' center indigo-text text-darken-2'>Not registered yet?</p>
                <p className=' center indigo-text text-darken-2'>Please sign up <Link to= '/signup'>here</Link> to continue</p>
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

