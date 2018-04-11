import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getBooksByCategory, searchCategory, clearSearchError
} from '../../actions/bookAction';
import ABook from '../Library/Book.jsx';
import SearchBar from '../Common/SearchBar.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';
import generic from '../../assets/images/generic.jpg';

/** @description displays books by their categories
 *
 * @class BookCategory
 *
 * @extends {Component}
 */
export class BookCategory extends Component {
  /** @description Creates an instance of BookCategory
   *
   * @param {object} props
   *
   * @memberof BookCategory
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
      pages: [],
      searchTerm: ''
    };
    this.bookId = '';
    this.categoryName = '';
    this.getCategory = this.getCategory.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.searchBookCategory = this.searchBookCategory.bind(this);
    this.submitCategorySearch = this.submitCategorySearch.bind(this);
  }

  /** @description gets the category
   *
   * @returns {*} null
   *
   * @memberof BookCategory
   */
  componentWillMount() {
    this.getCategory(this.props.location.pathname);
  }

  /** @description gets a new category
   *
   * @returns {*} null
   *
   * @param {object} nextProps
   *
   * @memberof BookCategory
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.getCategory(nextProps.location.pathname);
    }
  }

  /** @description gets the books in a category
   *
   * @returns {*} null
   *
   * @param {string} pathName
   *
   * @memberof BookCategory
   */
  getCategory(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[3];
    this.categoryId = id;
    this.props.getBooksByCategory(this.categoryId,
      this.state.limit, this.state.offset, this.getPagination);
  }

  /** @description gets pages
   *
   * @returns {*} null
   *
   * @memberof BookCategory
   */
  getPagination() {
    if (this.props.pagination) {
      this.getPages(this.props.pagination.pageCount);
    }
  }

  /** @description creates an array of page numbers
   *
   * @returns {*} null
   *
   * @param {number} pageCount
   *
   * @memberof BookCategory
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
   * @memberof BookCategory
   */
  getNewPage(event, page) {
    event.preventDefault();
    const pageOffset = this.state.limit * (page - 1);
    this.setState({
      offset: (page === 1) ? 0 : pageOffset
    }, () => {
      this.props.getBooksByCategory(this.categoryId,
        this.state.limit, this.state.offset, this.getPagination);
    });
  }

  /** @description moves to the next page
   *
   * @returns {*} null
   *
   * @param {object} event
   * @param {number} currentPage
   *
   * @memberof BookCategory
   */
  getNextPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getBooksByCategory(this.categoryId,
          this.state.limit, this.state.offset, this.getPagination);
      });
    }
  }

  /** @description moves to a previous page
   *
   * @returns {*} null
   *
   * @param {object} event
   * @param {number} currentPage
   *
   * @memberof BookCategory
   */
  getPreviousPage(event, currentPage) {
    event.preventDefault();
    if (currentPage !== 1) {
      const pageOffset = this.state.limit * (currentPage - 2);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getBooksByCategory(this.categoryId,
          this.state.limit, this.state.offset, this.getPagination);
      });
    }
  }

  /** @description searches on 3rd key stroke
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof BookCategory
   */
  searchBookCategory(event) {
    event.preventDefault();
    this.props.clearSearchError();
    this.setState({ searchTerm: event.target.value });
    if (event.target.value.length > 2) {
      this.props.searchCategory(
        event.target.value, this.categoryId, this.getPagination);
    } else {
      this.getCategory(this.props.location.pathname);
    }
  }

  /** @description searches when search icon is clicked
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof BookCategory
   */
  submitCategorySearch(event) {
    event.preventDefault();
    this.props.searchCategory(this.state.searchTerm, this.categoryId);
  }

  /** @description renders the books in a category
   *
   * @returns {JSX} JSX
   *
   * @memberof BookCategory
   */
  render() {
    if (!this.props.books) { return <Loader />; }
    let bookObject;
    (this.props.books.length === 0) ?
      (bookObject = (<p className='indigo-text text-darken-2'>
        Sorry! No books available for this category</p>)) :
      (bookObject = (<div>
        {this.props.books.map((book) => {
          let image = book.image;
          if (image === '' || image === null) { image = generic; }
          return (
            <div key={book.id}>
              <ABook image={image} title={book.title}
                author={book.author} category={this.props.category}
                description={book.description} status={book.status}
                id={book.id} quantity={book.quantity} />
            </div>
          );
        }
        )}
        <div className='col s12 center'>
          <Pagination
            previousPage={this.getPreviousPage}
            pages={this.state.pages}
            totalPages={this.props.pagination.pageCount}
            currentPage={this.props.pagination.page}
            pageClass={this.state.pageClass}
            newPage={this.getNewPage}
            nextPage={this.getNextPage} />
        </div>
      </div>)
      );
    return (
      <div className='row'>
        <div className='card white col s12 l9 offset-l2 library'>
          <h4 className='cat-name center'>{this.props.name}</h4>
          <div className='row indigo-text text-darken-2'>
            <div className='col s12'>
              <SearchBar
                searchItem={this.searchBookCategory}
                submit={this.submitCategorySearch}
              />
              {(this.props.error) ? <p>{this.props.error}</p> : bookObject}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { string } error
   * @returns { array } books
   * @returns { object } pagination details
   * @returns { string } name of the category
   */
const mapStateToProps = state => (
  {
    books: state.bookReducer.bookCategory.books,
    pagination: state.bookReducer.bookCategory.pagination,
    error: state.bookReducer.searchError,
    name: state.bookReducer.bookCategory.category
  }
);

export default connect(mapStateToProps, {
  getBooksByCategory, searchCategory, clearSearchError
})(BookCategory);
