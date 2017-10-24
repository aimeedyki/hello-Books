/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooks, setPagination } from '../../actions/bookAction';
import Book from '../Library/Book.jsx';
import generic from '../../assets/images/generic.jpg';


/** component that displays all books
 * @class Allbooks
 * @extends {Component}
 */
class Allbooks extends Component {
  /** Creates an instance of Allbooks.
 * @param {any} props
 * @memberof Allbooks
 */
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      limit: 8,
      offset: 0,
      pages: []
    };
    this.getPages = this.getPages.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
  }
  /** @returns {*} void
  * @memberof Allbooks
  */
  componentWillMount() {
    this.props.getBooks(this.state.limit, this.state.offset);
  }

  /** @description displays pagination
   * @returns {*} void
   * @param {any} nextProps
   * @memberof Allbooks
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.pagination.pageCount !== nextProps.pagination.pageCount) {
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
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getBooks(this.state.limit, this.state.offset);
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
    const pageOffset = this.state.limit * (currentPage);
    this.setState({
      offset: pageOffset
    }, () => {
      this.props.getBooks(this.state.limit, this.state.offset);
    });
  }
  /**
   * @returns {*} void
   * @param {any} event
   * @param {any} currentPage
   * @memberof Allbooks
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    const pageOffset = this.state.limit * (currentPage - 2);
    this.setState({
      offset: pageOffset
    }, () => {
      this.props.getBooks(this.state.limit, this.state.offset);
    });
  }
  /** @returns {*} all the books in the library
  * @memberof Allbooks
  */
  render() {
    return (
      <div className='row'>
        {this.props.books.map((book) => {
          let image = book.image;
          if (image === '' || image === null) { image = generic; }
          return (
            <div key={book.id}>
              <Book image={image} title={book.title}
                author={book.author} category={book.category.name}
                description={book.description} status={book.status}
                id={book.id} quantity={book.quantity} />
            </div>
          );
        })}
        <div className='center'>
          <ul className='pagination'>
            <li className='disabled'>
              <a onClick={event =>
                this.getPreviousPage(event, this.props.pagination.page)}>
                <i className='material-icons'>
              chevron_left</i></a></li>
            {this.state.pages.map(page => (
              <li className={this.state.pageClass}>
                <a onClick={event => this.getNewPage(event, page)}>
                  {page}</a></li>
            )
            )}
            <li className='waves-effect'>
              <a onClick={event =>
                this.getNextPage(event, this.props.pagination.page)}>
                <i className='material-icons'>
              chevron_right</i></a></li>
          </ul>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => ({
  books: state.bookReducer.books,
  pagination: state.bookReducer.pagination
});

export default connect(mapStateToProps, {
  getBooks, setPagination
})(Allbooks);
