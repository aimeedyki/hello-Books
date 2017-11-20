import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooks, searchBooks } from '../../actions/bookAction';
import Book from '../Library/Book.jsx';
import SearchBar from '../Common/SearchBar.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';
import generic from '../../assets/images/generic.jpg';


/** component that displays all books
 * @class Allbooks
 * @extends {Component}
 */
class Allbooks extends Component {
  /** Creates an instance of Allbooks.
* @param {*} props
 * @memberof Allbooks
 */
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
      pages: [],
      searchTerm: ''
    };
    this.getPages = this.getPages.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
    this.searchLibrary = this.searchLibrary.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }
  /** @returns {*} null
  * @memberof Allbooks
  */
  componentWillMount() {
    this.props.getBooks(this.state.limit,
      this.state.offset, this.getPagination);
  }

  /**
   * @returns {*} null
   * @memberof Allbooks
   */
  getPagination() {
    this.getPages(this.props.pagination.pageCount);
  }

  /** @description creates an array of page numbers
   * @returns {*} null
   * @param {number} pageCount
   * @memberof Allbooks
   */
  getPages(pageCount) {
    const pages = [];
    for (let index = 1; index <= pageCount; index++) {
      pages.push(index);
    }
    this.setState({
      pages
    });
  }
  /**
   * @returns {*} void
   * @param {*} event
   * @param {number} page
   * @memberof Allbooks
   */
  getNewPage(event, page) {
    event.preventDefault();
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getBooks(
        this.state.limit, this.state.offset, this.getPagination);
    });
  }
  /**
   * @returns {*} void
   * @param {*} event
   * @param {number} currentPage
   * @memberof Allbooks
   */
  getNextPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getBooks(
          this.state.limit, this.state.offset, this.getPagination);
      });
    }
  }
  /**
   * @returns {*} void
   * @param {*} event
   * @param {number} currentPage
   * @memberof Allbooks
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== 1) {
      const pageOffset = this.state.limit * (currentPage - 2);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getBooks(
          this.state.limit, this.state.offset, this.getPagination);
      });
    }
  }
  /** @description searches on 3rd key stroke
   * @returns {object} books
   * @param {*} event
   * @memberof Allbooks
   */
  searchLibrary(event) {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
    if (event.target.value.length > 2) {
      this.props.searchBooks(event.target.value);
    } else {
      this.props.getBooks(
        this.state.limit, this.state.offset, this.getPagination);
    }
  }
  /** @description searches when search icon is clicked
   * @returns {object} books
   * @param {*} event
   * @memberof Allbooks
   */
  submitSearch(event) {
    event.preventDefault();
    this.props.searchBooks(this.state.searchTerm);
  }
  /** @returns {*} all the books in the library
  * @memberof Allbooks
  */
  render() {
    if (!this.props.books) { return <Loader />; }
    return (
      <div className='row'>
        <SearchBar searchItem={this.searchLibrary} submit={this.submitSearch} />
        {this.props.books.map((book) => {
          let image = book.image;
          if (image === '' || image === null) { image = generic; }
          // if (this.props.error) { return <p>{this.props.error}</p>; }
          return (
            <div key={book.id}>
              <Book image={image} title={book.title}
                author={book.author} category={book.category.name}
                description={book.description} status={book.status}
                id={book.id} quantity={book.quantity}
                getPagination={this.getPagination}
              />
            </div>
          );
        })}
        <div className='col s12 center'>
          <Pagination
            previousPage={this.getPreviousPage}
            pages={this.state.pages}
            totalPages={this.props.pagination.pageCount}
            currentPage={this.props.pagination.page}
            pageClass={this.state.pageClass}
            newPage={this.getNewPage}
            nextPage={this.getNextPage}
          />
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => ({
  error: state.bookReducer.error,
  books: state.bookReducer.books.books,
  pagination: state.bookReducer.books.pagination
});

export default connect(mapStateToProps, {
  getBooks, searchBooks
})(Allbooks);
