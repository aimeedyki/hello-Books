/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { displayNotification } from '../../actions/userAction';
import Table from '../Common/Table.jsx';


/** component that notifies the admin
 * of users activities
 * @class UserActivity
 * @extends {Component}
 */
class UserActivity extends Component {
  /** Creates an instance of UserActivity.
   * @param {any} props
   * @memberof UserActivity
   */
  constructor(props) {
    super(props);
    this.data = [];
  }

  /** fetches notification table
   * @returns {*} void
   * @memberof UserActivity
   */
  componentDidMount() {
    this.props.displayNotification();
  }

  /** @returns {*} notification details
   * @param {any} nextProps
   * @memberof UserActivity
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.data = nextProps.notifications.map((notification) => {
        const user = notification.user.username;
        const book = notification.book.title;
        const userAction = notification.action;
        const dated = moment(notification.createdAt).format('MMMM Do YYYY');

        return ({
          username: user,
          title: book,
          action: userAction,
          created: dated
        });
      });
    }
  }
  /** @returns {*} component
   * @memberof UserActivity
   */
  render() {
    const header = [
      {
        name: 'USER',
        prop: 'username'
      },
      {
        name: 'BOOK',
        prop: 'title'
      },
      {
        name: 'ACTION',
        prop: 'action'
      },
      {
        name: 'DATE',
        prop: 'created'
      }
    ];
    return (
      <div className='row'>
        <div className='card col s12 l6 offset-l3'>
          <Table data={this.data} header={header} />
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => (
  {
    notifications: state.userReducer.notifications,
  }
);

export default connect(mapStateToProps, {
  displayNotification
})(UserActivity);
