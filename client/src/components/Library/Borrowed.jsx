/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { getHistory, displayUserpage } from '../../actions/userAction';
import Table from '../Common/Table.jsx';

/**
 * Displays a users history of borrowed
 * books
 * 
 * @class Borrowed
 * @extends {Component}
 */
class Borrowed extends Component {
  /**
   * Creates an instance of Borrowed.
   * @param {any} props 
   * @memberof Borrowed
   */
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      histories: [],
      userId: ''
    };
  }
  /**
   * gets the history of a user
   * @returns {*} void
   * @memberof Borrowed
   */
  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getHistory(userId);
  }
  /**
   * 
   * @returns {*} book details
   * @param {any} nextProps 
   * @memberof Borrowed
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.data = nextProps.histories.map((history) => {
        const bookTitle = history.book.title;
        const borrowed = moment(history.createdAt).format('MMMM Do YYYY');
        const expected = moment(history.expectedDate).format('MMMM Do YYYY');
        let returned;
        /* eslint-disable no-unused-expressions */
        (history.returnedDate === null) ? (returned = 'Not returned') :
          (returned = moment(history.returnedDate).format('MMMM Do YYYY'));
        return ({
          title: bookTitle,
          borrowdate: borrowed,
          returndate: returned,
          due: expected
        });
      });
    }
  }
  /**
   * 
   * 
   * @returns {*} users' history
   * @memberof Borrowed
   */
  render() {
    const header = [
      {
        name: 'TITLE',
        prop: 'title'
      },
      {
        name: 'DATE BORROWED',
        prop: 'borrowdate'
      },
      {
        name: 'DATE RETURNED',
        prop: 'returndate'
      },
      {
        name: 'DUE DATE',
        prop: 'due'
      }
    ];
    return (
      <div className='row'>
        <div key={this.props.histories.id}
          className='card col s12 l8 offset-l3'>
          <Table data={this.data}
            header={header} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return {
    histories: state.userReducer.histories,
    user
  };
};

export default connect(mapStateToProps, {
  getHistory, displayUserpage
})(Borrowed);
