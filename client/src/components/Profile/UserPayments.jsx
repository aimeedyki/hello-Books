import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { submitTransaction } from '../../actions/userAction';

import Button from '../Common/Button';

/** @description allows user to upload payments
 *
 * @class UserPayments
 *
 * @extends {Component}
 */
export class UserPayments extends Component {
  /** @description Creates an instance of UserPayments.
   *
   * @param {object} props
   *
   * @memberof UserPayments
   */
  constructor(props) {
    super(props);
    this.state = {
      transactionId: '',
      amount: 0,
      transactionType: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePage = this.closePage.bind(this);
  }

  /** @description sets the state to the value of the respective fields
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof UserPayments
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description sets the state to the value of the respective fields
   *
   * @returns {*} null
   *
   * @memberof UserPayments
   */
  closePage() {
    this.props.history.push('/main/profile');
  }

  /** @description submits a form and adds book to library
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof UserPayments
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.submitTransaction(this.state).then((res) => {
      if (res) {
        Materialize.toast('Uploaded Successfully!', 4000, 'indigo darken-2');
        this.props.history.push('/main/profile');
      }
    })
      .catch((error) => {
        Materialize.toast(error.message, 4000, 'indigo darken-2');
      });
  }

  /** @description renders the UserPayments component
   *
   * @returns {*} null
   *
   * @memberof UserPayments
   */
  render() {
    return (
      <div className="row">
        <div className="card profile col l5 offset-l4 shadow">
          <i className="material-icons red-text right close link-cursor"
            id='close'
            onClick={this.closePage}>
            close</i>
          <h5 className='greeting indigo-text text-darken-2 center'><b>
            Upload Payments</b></h5>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <select name="transactionType" id="transactionType"
                  className='browser-default indigo-text text-darken-2'
                  onChange={this.handleChange}
                  value={this.state.transactionType}
                  required>
                  <option defaultValue="" selected disabled>
                    Select a Transaction </option>
                  <option value="surcharge">
                    Surcharge</option>
                  <option value="subscription">
                    Subscription</option>
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
              <div className='row'>
                <div className='center'>
                  <Button type='submit' name='action' label='Submit' />
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
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  return {
    user
  };
};

export default connect(mapStateToProps, {
  submitTransaction
})(withRouter(UserPayments));
