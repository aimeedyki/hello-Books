/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { getHistory } from '../../actions/userAction';
import Table from '../Common/Table.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';

/** Displays a users history of borrowed
 * books
 * @class Borrowed
 * @extends {Component}
 */
class Borrowed extends Component {
  /** Creates an instance of Borrowed.
   * @param {any} props
   * @memberof Borrowed
   */
  constructor(props) {
    super(props);
    this.data = [];
    this.userId = '';
    this.state = {
      limit: 10,
      offset: 0,
      pages: []
    };
    this.getPages = this.getPages.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }
  /** gets the history of a user
   * @returns {*} void
   * @memberof Borrowed
   */
  componentDidMount() {
    const { userId } = this.props.user;
    this.userId = userId;
    this.props.getHistory(userId, this.state.limit,
      this.state.offset);
  }
  /** @returns {*} book details
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
      this.getPages(nextProps.pagination.pageCount);
    }
  }

  /** @description creates an array of page numbers
   * @returns {*} void
   * @param {any} pageCount
   * @memberof Allbooks
   */
  getPages(pageCount) {
    const pages = [];
    /* eslint-disable no-plusplus */
    for (let index = 1; index <= pageCount; index++) {
      pages.push(index);
    }
    this.setState({
      pages
    });
  }
  /**
   * @returns {*} void
   * @param {any} event
   * @param {any} page
   * @memberof Allbooks
   */
  getNewPage(event, page) {
    event.preventDefault();
    const { userId } = this.props.user;
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getHistory(userId, this.state.limit,
        this.state.offset);
    });
  }
  /**
   * @returns {*} void
   * @param {any} event
   * @param {any} currentPage
   * @memberof Allbooks
   */
  getNextPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getHistory(this.userId, this.state.limit,
          this.state.offset);
      });
    }
  }
  /**
   * @returns {*} void
   * @param {any} event
   * @param {any} currentPage
   * @memberof Allbooks
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== 1) {
      const pageOffset = this.state.limit * (currentPage - 2);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getHistory(this.userId, this.state.limit,
          this.state.offset);
      });
    }
  }
  /** @returns {*} users' history
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
    if (!this.props.pagination) { return <Loader />; }
    return (
      <div className='row'>
        <div className='card col s12 l8 offset-l3'>
          <Table data={this.data}
            header={header} />
          <Pagination
            previousPage={this.getPreviousPage}
            pages={this.state.pages}
            totalPages={this.props.pagination.pageCount}
            currentPage={this.props.pagination.page}
            pageClass={this.state.pageClass}
            newPage={this.getNewPage}
            nextPage={this.getNextPage} />
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    histories: state.userReducer.histories.histories,
    pagination: state.userReducer.histories.pagination,
    user
  };
};

export default connect(mapStateToProps, {
  getHistory
})(Borrowed);
