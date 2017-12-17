import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import alert from 'sweetalert';

import { returnBook } from '../../actions/bookAction';
import { getOutstanding } from '../../actions/userAction';
import Table from '../Common/Table.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';

/** @description displays books not returned
 *
 * @class Outstanding
 *
 * @extends {Component}
 */
export class Outstanding extends Component {
  /** @description Creates an instance of Outstanding.
    *
     * @param {*} props
     *
     * @memberof Outstanding
     */
  constructor(props) {
    super(props);
    this.outstandingBooks = [];
    this.state = {
      limit: 10,
      offset: 0,
      pages: []
    };
    this.return = this.return.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }
  /** @description fetches outstanding books
   *
   * @memberof Outstanding
   *
   * @returns {*} null
   */
  componentDidMount() {
    this.props.getOutstanding(this.state.limit,
      this.state.offset);
  }

  /** @description refreshes book page
   *
   * @returns {*} null
   *
   * @memberof Book
   */
  refresh() {
    this.props.getOutstanding(this.state.limit,
      this.state.offset);
  }
  /** @description returns a book
   *
   * @param {number} id
   *
   * @returns {*} null
   *
   * @memberof Outstanding
   */
  return(id) {
    alert({
      title: 'Return this book?',
      text: 'Are you sure that you want to return this book?',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willReturn) => {
        if (willReturn) {
          this.props.returnBook(id, this.refresh)
            .then((res) => {
              if (res) {
                alert('Returned!', 'Book has been Returned!', 'success');
              } else {
                alert('Oops!', this.props.errorMessage, 'error');
              }
            });
        }
      });
  }
  /** @description sets an array of books fetched when available
   *
   * @returns {*} null
   * 
   * @param { object } nextProps
   *
   * @memberof Outstanding
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.notReturned) {
        this.outstandingBooks = nextProps.notReturned.map((notReturnedItem) => {
          const bookTitle = notReturnedItem.book.title;
          const borrowed = moment(
            notReturnedItem.createdAt).format('MMMM Do YYYY');
          const expected = moment(
            notReturnedItem.expectedDate).format('MMMM Do YYYY');
          const historyId = notReturnedItem.id;
          return ({
            title: bookTitle,
            borrowdate: borrowed,
            due: expected,
            return: <a className='link-cursor' id={`return-${historyId}`}
              onClick={() => { this.return(historyId); }}>RETURN</a>
          });
        });
        this.getPages(nextProps.pagination.pageCount);
      }
    }
  }

  /** @description creates an array of page numbers
   *
   * @returns { * } null
   *
   * @param { number } pageCount
   *
   * @memberof Outstanding
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
   * @returns {*} null
   *
   * @param { object } event
   * @param { number } page
   *
   * @memberof Outstanding
   */
  getNewPage(event, page) {
    event.preventDefault();
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getOutstanding(
        this.state.limit, this.state.offset
      );
    });
  }

  /** @description moves to the next page
   *
   * @returns {*} null
   *
   * @param { object } event
   * @param { number } currentPage
   *
   * @memberof Outstanding
   */
  getNextPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getOutstanding(
          this.state.limit, this.state.offset
        );
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
   * @memberof Outstanding
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== 1) {
      const pageOffset = this.state.limit * (currentPage - 2);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getOutstanding(
          this.state.limit, this.state.offset
        );
      });
    }
  }

  /** @description renders outstanding books table
   *
   * @returns { JSX } JSX
   *
   * @memberof Outstanding
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
        name: 'DUE DATE',
        prop: 'due'
      },
      {
        name: 'RETURN NOW?',
        prop: 'return'
      }
    ];
    if (!this.props.pagination) { return <Loader />; }
    return (
      <div className='row center'>
        <div className='card col s12 l8 offset-l3'>
          <Table record={this.outstandingBooks} header={header} />
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
   * @returns { array } books not returned
   * @returns { object } pagination details
   * @returns { string } error message
   */
const mapStateToProps = state => (
  {
    notReturned: state.userReducer.notReturned.histories,
    pagination: state.userReducer.notReturned.pagination,
    errorMessage: state.bookReducer.error,

  }
);
export default connect(mapStateToProps, {
  getOutstanding, returnBook
})(Outstanding);
