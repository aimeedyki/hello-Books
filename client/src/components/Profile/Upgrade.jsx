/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { changeLevel, displayUserpage } from '../../actions/userAction';
import Button from '../Common/Button.jsx';

/**
 * Change level component
 * 
 * @class ChangeLevel
 * @extends {Component}
 */
class ChangeLevel extends Component {
  /**
   * Creates an instance of ChangeLevel.
   * @param {any} props 
   * @memberof ChangeLevel
   */
  constructor(props) {
    super(props);
    this.state = {
      newLevel: '',
      userId: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  /**
   * gets user detail
   * 
   * @returns {*} void
   * @memberof ChangeLevel
   */
  componentWillMount() {
    this.props.displayUserpage();
  }
  /**
   * 
   *  @returns {*} void
   * @param {any} prevProps 
   * @memberof ChangeLevel
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /**
   * sets the state of the level to the value of the select field
   * 
   * @returns {*} void
   * @param {any} event 
   * @memberof ChangeLevel
   */
  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ newLevel: event.target.value });
  }

  /**
   * 
   * @returns {*} void
   * @param {any} event 
   * @memberof ChangeLevel
   */
  handleFormSubmit(event) {
    event.preventDefault();
    const { userId, level } = this.props.user;
    if (this.state.newLevel !== level) {
      this.props.changeLevel(userId, this.state.newLevel).then((res) => {
        if (res) {
          this.props.displayUserpage();
          /* eslint-disable no-undef */
          Materialize.toast('Level changed successfully!!', 4000);
          this.props.history.push('/user');
        }
      });
    } else {
      Materialize.toast('You can not change to a current level!',
        4000);
    }
  }

  /**
   * 
   * 
   * @returns {string} error message
   * @memberof ChangeLevel
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000, '', () => {
          this.props.clearErrorMessage();
        })
      );
    }
  }
  /**
   * renders the component to change level
   * 
   * @returns {*} component
   * @memberof ChangeLevel
   */
  render() {
    return (
      <div className='row'>
        <div className='card col s10 m8 l4 offset-s1 offset-m2 offset-l5'
          className='profile'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'
                className='level'>
                <h5 className='indigo-text text-darken-2 center'
                  className='margin-fix'>
                  Change Level</h5>
                <div >
                  <p className='center blue-text text-darken-2'>
                    please select a new level</p>
                  <p className='center blue-text text-darken-2'>
                    terms and conditions apply</p>
                </div>
                <div className='level-select'>
                  <label>Membership Level</label>
                  <select ref='level' id='level'
                    className='browser-default indigo-text text-darken-2'
                    onChange={this.handleSelectChange}
                    value={this.state.value}
                    required>
                    <option defaultValue='' selected disabled>
                      Select a level</option>
                    <option value='rookie'>Rookie</option>
                    <option value='bookworm'>
                      Bookworm  N2000/month</option>
                    <option value='voracious' >Voracious  N5000/month</option>
                  </select>
                </div>
                <div className='center margin-fix'>
                  <Button type='submit' name='action'
                    label='Change Level' icon='save' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;

  return {
    user,
    errorMessage: state.userReducer.error
  };
};

export default connect(mapStateToProps, {
  changeLevel, displayUserpage, clearErrorMessage
})(withRouter(ChangeLevel));
