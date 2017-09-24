import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { displayNotification } from '../../actions/userAction.js';
import Table from '../Common/Table.jsx';


class UserActivity extends Component {
  constructor(props) {
    super(props);
    this.data = []
}

  componentDidMount() {

    this.props.displayNotification();

  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.data = nextProps.notifications.map((notification) => {
        let user = notification.user.username;
        let book = notification.book.title;
        let userAction = notification.action;
        let activityDate = moment(notification.createdAt).format('MMMM Do YYYY, h:mm:ss a');

        return ({
          username: user,
          title: book,
          action: userAction,
          created: activityDate
        })
      });
    }
  }
  render() {

    const header = [
      {
        name: "USER",
        prop: "username"
      },
      {
        name: "BOOK",
        prop: "title"
      },
      {
        name: "ACTION",
        prop: "action"
      },
      {
        name: "DATE",
        prop: "created"
      }
    ];
    return (
      <div className="row">
        <div className="col s12 l6 offset-l3">
          <Table data={this.data} header={header} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    notifications: state.userReducer.notifications,
 
  };
}

export default connect(mapStateToProps, {
  displayNotification
})(UserActivity);
