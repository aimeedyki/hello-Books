
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage, getUser } from '../../actions/authAction';
import { changeLevel } from '../../actions/userAction';
import Button from '../Common/Button.jsx';

/** @description Change level component
 *
 * @class ChangeLevel
 *
 * @extends {Component}
 */
export class ChangeLevel extends Component {
  /** @description Creates an instance of ChangeLevel
   *
   * @param { object } props
   *
   * @memberof ChangeLevel
   */
  constructor(props) {
    super(props);
    this.state = {
      newLevelId: this.props.user.levelId,
      transactionId: '',
      amount: 0
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.closePage = this.closePage.bind(this);
  }

  /** @description calls the function to display an error if there is one
   *
   * @returns {*} null
   *
   * @param {object} prevProps
   *
   * @memberof ChangeLevel
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  /** @description sets the state of the level to the value of the select field
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof ChangeLevel
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description submits the level change form
   *
   * @returns {*} null
   *
   * @param { object } event
   *
   * @memberof ChangeLevel
   */
  handleFormSubmit(event) {
    event.preventDefault();
    const { levelId } = this.props.user;
    const newLevelId = parseInt(this.state.newLevelId, 10);
    if (newLevelId !== levelId) {
      this.props.changeLevel(this.state).then((response) => {
        if (response) {
          this.props.history.push('/main/profile');
        }
      });
    } else {
      Materialize.toast(
        'You can not change to a current level! Please choose another level',
        4000, 'indigo darken-2'
      );
    }
  }

  /** @description closes the page
   *
   * @returns {*} null
   *
   * @memberof ChangeLevel
   */
  closePage() {
    this.props.history.push('/main/profile');
  }
  /** @description displays error message
   *
   * @returns {string} error message
   *
   * @memberof ChangeLevel
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(
          this.props.errorMessage, 4000, 'indigo darken-2', () => {
            this.props.clearErrorMessage();
          }
        )
      );
    }
  }
  /** @description renders the component to change level
   *
   * @returns {*} component
   *
   * @memberof ChangeLevel
   */
  render() {
    return (
      <div className='row'>
        <div className='card col s10 m8 l4 offset-s1 offset-m2 offset-l5'>
          <i className="material-icons red-text right close link-cursor"
            id="close" onClick={this.closePage}>
            close</i>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row profile'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'
                className='level'>
                <h5 className='greeting indigo-text text-darken-2 center'><b>
                  Change Level</b></h5>
                <div >
                  <p className='center blue-text text-darken-2'>
                    please select a new level</p>
                  <p className='center blue-text text-darken-2'>
                    terms and conditions apply</p>
                </div>
                <div className='level-select'>
                  <label>Membership Level</label>
                  <select name='newLevelId' id='level'
                    className='browser-default indigo-text text-darken-2'
                    onChange={this.handleChange}
                    value={this.state.newLevelId}
                    required>
                    <option defaultValue='' selected disabled>
                      Select a level</option>
                    <option value='1'>Rookie</option>
                    <option value='2'>
                      Bookworm  N2000/month</option>
                    <option value='3' >Voracious  N5000/month</option>
                  </select>
                  <div className='input-field col s12'>
                    <input name='transactionId' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.transactionId}
                      required
                    />
                    <label>Transaction Reference</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='amount' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.amount}
                      required
                    />
                    <label>Amount</label>
                  </div>
                </div>
                <div className='center margin-fix'>
                  <Button type='submit' name='action'
                    label='Submit' icon='save' />
                </div>
              </div>
            </div>
          </form>
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
   * @returns { string } error message
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { error } = state.userReducer;
  return {
    user,
    errorMessage: error
  };
};

export default connect(mapStateToProps, {
  changeLevel, clearErrorMessage, getUser
})(withRouter(ChangeLevel));
