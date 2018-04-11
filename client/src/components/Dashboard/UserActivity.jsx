import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { displayNotification } from '../../actions/userAction';
import Table from '../Common/Table.jsx';


/** @description component that notifies the admin
 * of users activities
 *
 * @class UserActivity
 *
 * @extends {Component}
 */
export class UserActivity extends Component {
  /** @description Creates an instance of UserActivity
   *
   * @param {object} props
   *
   * @memberof UserActivity
   */
  constructor(props) {
    super(props);
    this.activities = [];
  }

  /** @description fetches notification table
   *
   * @returns {*} null
   *
   * @memberof UserActivity
   */
  componentDidMount() {
    this.props.displayNotification();
  }

  /** @description maps the notification record to its heading
   *
   * @returns {array} notification details
   *
   * @param {object} nextProps
   *
   * @memberof UserActivity
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.activities = nextProps.notifications.map((notification) => {
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

  /** @description displays users activities
   *
   * @returns {*} null
   *
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
      <div>
        <Table record={this.activities} header={header} />
      </div>
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { array } notifications
   */
const mapStateToProps = state => (
  {
    notifications: state.userReducer.notifications,
  }
);

export default connect(mapStateToProps, {
  displayNotification
})(UserActivity);
