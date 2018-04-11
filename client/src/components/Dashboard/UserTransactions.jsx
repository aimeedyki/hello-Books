import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import alert from 'sweetalert';
import Table from '../Common/Table';
import {
  displayAllTransactions,
  confirmTransaction,
  displayConfirmedTransactions,
  displayUnconfirmedTransactions
} from '../../actions/userAction';

/** @description displays users transactions
 *
 * @class UserTransactions
 *
 * @extends {Component}
 */
export class UserTransactions extends Component {
  /** @description Creates an instance of UserTransactions
   *
   * @param {object} props
   *
   * @memberof UserTransactions
   */
  constructor(props) {
    super(props);
    this.state = {
      transactionDetails: [],
      value: ''
    };
    this.transactionDetails = [];
    this.confirm = this.confirm.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  /** @description displays all the transactions
   *
   * @returns {*} null
   *
   * @memberof UserTransactions
   */
  componentDidMount() {
    this.props.displayAllTransactions();
  }

  /** @description maps transactions to headings
   *
   * @returns {*} null
   *
   * @param {object} nextProps
   *
   * @memberof UserTransactions
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.transactions !== nextProps.transactions) {
      this.transactionDetails = nextProps.transactions.map((transaction) => {
        const {
          username, transactionId, amount, transactionType, id, confirmed
        } = transaction;
        const level = transaction.level.type;
        const created = moment(
          transaction.createdAt).format('MMMM Do YYYY');
        let confirmLink;
        if (confirmed === true) {
          confirmLink = 'Confirmed';
        } else {
          confirmLink = <a className='link-cursor' id={`confirm-${id}`}
            onClick={() => { this.confirm(id, level, transactionType); }}>
            CONFIRM</a>;
        }
        return ({
          username,
          transactionId,
          amount,
          transactionType,
          created,
          confirm: confirmLink
        });
      });
    }
  }
  /** @description confirms transaction
   *
   * @returns {*} null
   *
   * @param {number} id
   * @param {string} level
   * @param {string} type
   *
   * @memberof UserTransactions
   */
  confirm(id, level, type) {
    let text;
    if (type === 'subscription') {
      text = `Confirm ${level} subscription?`;
    }
    if (type === 'surcharge') {
      text = 'Confirm surcharge payment?';
    }
    alert({
      title: 'Confirm?',
      text,
      icon: 'warning',
    })
      .then((willConfirm) => {
        if (willConfirm) {
          this.props.confirmTransaction(id)
            .then((res) => {
              if (res) {
                alert('Confirmed!', 'Transaction confirmed', 'success');
              } else {
                alert('Oops!', this.props.error, 'error');
              }
            });
        }
      });
  }
  /** @description handles transaction filter
   *
   * @returns {*} null
   *
   * @param { object } event
   *
   * @memberof UserTransactions
   */
  handleFilter(event) {
    event.preventDefault();
    if (event.target.value === 'all') {
      this.props.displayAllTransactions();
    }
    if (event.target.value === 'confirmed') {
      this.props.displayConfirmedTransactions();
    }
    if (event.target.value === 'unconfirmed') {
      this.props.displayUnconfirmedTransactions();
    }
  }
  /** @description displays user's transction
   *
   * @returns {*} null
   * @memberof UserTransactions
   */
  render() {
    const header = [
      {
        name: 'User',
        prop: 'username'
      },
      {
        name: 'Transaction ref',
        prop: 'transactionId'
      },
      {
        name: 'Amount',
        prop: 'amount'
      },
      {
        name: 'Transaction Type',
        prop: 'transactionType'
      },
      {
        name: 'DATE',
        prop: 'created'
      },
      {
        name: 'Confirm?',
        prop: 'confirm'
      }
    ];
    return (
      <div>
        <h5 className='center transaction indigo-text text-darken-2'><b>
          User Transactions</b></h5>
        <select ref='filter' id='filter'
          className='browser-default indigo-text text-darken-2'
          onChange={this.handleFilter}>
          <option value="all">All</option>
          <option value="confirmed">
            Confirmed
          </option>
          <option value="unconfirmed" >
            Unconfirmed
          </option>
        </select>
        <Table record={this.transactionDetails} header={header} />
      </div>
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { array } transactions
   * @returns { strings } error message
   */
const mapStateToProps = state => (
  {
    transactions: state.userReducer.transactions.transactions,
    error: state.userReducer.error
  }
);
export default connect(mapStateToProps, {
  displayAllTransactions,
  confirmTransaction,
  displayConfirmedTransactions,
  displayUnconfirmedTransactions
})(UserTransactions);
