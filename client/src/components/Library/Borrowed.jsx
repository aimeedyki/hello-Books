import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import { getHistory } from '../../actions/userAction';
import Table from '../Common/Table.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';

/** @description Displays a users history of borrowed
 * books
 *
 * @class Borrowed
 *
 * @extends {Component}
 */
export class Borrowed extends Component {
  /** @description Creates an instance of Borrowed
   *
   * @param { object } props
   *
   * @memberof Borrowed
   */
  constructor(props) {
    super(props);
    this.borrowedBooks = [];
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

  /** @description gets the history of a user
   *
   * @returns { * } null
   *
   * @memberof Borrowed
   */
  componentDidMount() {
    this.props.getHistory(this.state.limit,
      this.state.offset);
  }

  /** @description maps the users borrow history to the table
   *
   * @returns { array } history details
   *
   * @param { object } nextProps
   *
   * @memberof Borrowed
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.borrowedBooks = nextProps.histories.map((history) => {
        const bookTitle = history.book.title;
        const borrowed = moment(history.createdAt).format('MMMM Do YYYY');
        const expected = moment(history.expectedDate).format('MMMM Do YYYY');
        let returned;
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
   *
   * @returns {*} null
   *
   * @param { number } pageCount
   * @memberof Borrowed
   */
  getPages(pageCount) {
    const pages = Array.from({ length: pageCount },
      (value, index) => index + 1);
    this.setState({
      pages
    });
  }

  /** @description moves to a new page
   *
   * @returns { * } null
   *
   * @param { object } event
   * @param { number } page
   *
   * @memberof Borrowed
   */
  getNewPage(event, page) {
    event.preventDefault();
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getHistory(this.state.limit,
        this.state.offset);
    });
  }

  /** @description moves to the next page
   *
   * @returns {*} null
   *
   * @param { object } event
   * @param { number } currentPage
   *
   * @memberof Borrowed
   */
  getNextPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getHistory(this.state.limit,
          this.state.offset);
      });
    }
  }

  /** @description moves to a previous page
   *
   * @returns {*} null
   *
   * @param { object } event
   * @param { number } currentPage
   *
   * @memberof Borrowed
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== 1) {
      const pageOffset = this.state.limit * (currentPage - 2);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getHistory(this.state.limit,
          this.state.offset);
      });
    }
  }

  /** @description renders user's history
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
    if (!this.props.histories) { return <Loader />; }
    return (
      <div className='row center'>
        <div className='card col s12 l8 offset-l3'>
          <Table record={this.borrowedBooks}
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

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { array } borroy history
   * @returns { object } pagination details
   * @returns { object } user details
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { histories, pagination } = state.userReducer.histories;
  return {
    histories,
    pagination,
    user
  };
};

export default connect(mapStateToProps, {
  getHistory
})(Borrowed);
