/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import alert from 'sweetalert';

import { returnBook } from '../../actions/bookAction';
import { getOutstanding } from '../../actions/userAction';
import Table from '../Common/Table.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';
/** displays books not returned
 * @class Outstanding
 * @extends {Component}
 */
class Outstanding extends Component {
  /** Creates an instance of Outstanding.
     * @param {any} props
     * @memberof Outstanding
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
    this.return = this.return.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
  }
  /** fetches outstanding books
   * @memberof Outstanding
   * @returns {object} outstanding books
   */
  componentDidMount() {
    const { userId } = this.props.user;
    this.userId = userId;
    this.props.getOutstanding(userId, this.state.limit,
      this.state.offset);
  }

  /** @description refreshes book page
   * @returns {*} void
   * @memberof Book
   */
  refresh() {
    this.props.getOutstanding(this.props.user.userId);
  }
  /** returns a book
   * @param {any} id
   * @param {any} userId
   * @memberof Outstanding
   * @returns {*} void
   */
  return(id, userId) {
    alert({
      title: 'Return this book?',
      text: 'Are you sure that you want to return this book?',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willReturn) => {
        if (willReturn) {
          this.props.returnBook(id, userId, this.refresh)
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
  /** sets an array of books fetched when available
   * @param {any} nextProps
   * @memberof Outstanding
   * @returns {object} outstanding books
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { userId } = this.props.user;
      this.data = nextProps.notReturned.map((notReturnedItem) => {
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
          return: <a className='link-cursor'
            onClick={() => { this.return(historyId, userId); }}>RETURN</a>
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
      this.props.getHistory(
        userId, this.state.limit, this.state.offset
      );
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
        this.props.getHistory(
          this.userId, this.state.limit, this.state.offset
        );
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
        this.props.getHistory(
          this.userId, this.state.limit, this.state.offset
        );
      });
    }
  }

  /** renders outstanding books table
   * @returns {*} component
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
      <div className='row'>
        <div className='card col s12 l8 offset-l3'>
          <Table data={this.data} header={header} />
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
    notReturned: state.userReducer.notReturned.histories,
    pagination: state.userReducer.notReturned.pagination,
    user
  };
};
export default connect(mapStateToProps, {
  getOutstanding, returnBook
})(Outstanding);
