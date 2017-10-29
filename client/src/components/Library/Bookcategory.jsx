/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooksByCategory } from '../../actions/bookAction';
import Book from '../Library/Book.jsx';
import Loader from '../Common/Loader.jsx';
import Pagination from '../Common/Pagination';
import generic from '../../assets/images/generic.jpg';

/** displays books by their categories
 * @class Bookcategory
 * @extends {Component}
 */
class Bookcategory extends Component {
  /** Creates an instance of Bookcategory.
  * @param {any} props
   * @memberof Bookcategory
  */
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
      pages: []
    };
    this.bookId = '';
    this.categoryName = '';
    this.getCategoryId = this.getCategoryId.bind(this);
    this.getPages = this.getPages.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.getNewPage = this.getNewPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
  }
  /** gets the category ?Id
   * @returns {*} void
   * @memberof Bookcategory
   */
  componentWillMount() {
    this.getCategoryId(this.props.location.pathname);
  }
  /** @returns {string} category id
   * @param {any} pathName
   * @memberof Bookcategory
   */
  getCategoryId(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[2];
    this.categoryName = stringArray[3];
    this.categoryId = id;
    this.props.getBooksByCategory(this.categoryId,
      this.state.limit, this.state.offset, this.getPagination);
  }
  /**
  * @returns {*} void
  * @memberof Allbooks
  */
  getPagination() {
    this.getPages(this.props.pagination.pageCount);
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
    if (currentPage !== this.props.pagination.pageCount) {
      const pageOffset = this.state.limit * (currentPage);
      this.setState({
        offset: pageOffset
      }, () => {
        this.props.getBooks(this.state.limit, this.state.offset);
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
        this.props.getBooks(this.state.limit, this.state.offset);
      });
    }
  }
  /** renders the books in a category
   * @returns {*} category component
   * @memberof Bookcategory
   */
  render() {
    if (!this.props.books) { return <Loader />; }
    let bookObject;
    /* eslint-disable no-unused-expressions */
    (this.props.books.length === 0) ?
      (bookObject = (<p className='indigo-text text-darken-2'>
        Sorry! No books available for this category</p>)) :
      (bookObject = (<div>
        {this.props.books.map((book) => {
          let image = book.image;
          if (image === '' || image === null) { image = generic; }
          return (
            <div key={book.id}>
              <Book image={image} title={book.title}
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
        <h4 className='cat-name center'>{this.categoryName}</h4>
        <div className='col s12 l10 m12 offset-l2'>
          <div className='row indigo-text text-darken-2'>
            <div className='col s12'>
              {bookObject}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => (
  {
    // category: state.bookReducer.bookCategory.name,
    books: state.bookReducer.bookCategory.books,
    pagination: state.bookReducer.bookCategory.pagination
  }
);

export default connect(mapStateToProps, {
  getBooksByCategory,
})(Bookcategory);
