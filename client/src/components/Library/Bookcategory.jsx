/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooksByCategory } from '../../actions/bookAction';
import Book from '../Library/Book.jsx';
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
      books: {},
    };
    this.bookId = '';
    this.getCategoryId = this.getCategoryId.bind(this);
  }
  /** gets the category ?Id
   * @returns {*} void
   * @memberof Bookcategory
   */
  componentWillMount() {
    this.getCategoryId(this.props.location.pathname);
    this.props.getBooksByCategory(this.categoryId);
  }
  /** @returns {string} category id
   * @param {any} pathName
   * @memberof Bookcategory
   */
  getCategoryId(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[2];
    this.categoryId = id;
  }
  /** renders the books in a category
   * @returns {*} category component
   * @memberof Bookcategory
   */
  render() {
    let bookObject;
    /* eslint-disable no-unused-expressions */
    (this.props.books.length === 0) ?
      (bookObject = (<p className='indigo-text text-darken-2'>
        Sorry! No books available for this category</p>)) :
      (bookObject = this.props.books.map((book) => {
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
      ));
    return (
      <div className='row'>
        <div className=''>
          <h4 className='cat-name center'>{this.props.category}</h4>
        </div>
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
    category: state.bookReducer.bookCategory.name,
    books: state.bookReducer.bookCategory.books
  }
);

export default connect(mapStateToProps, {
  getBooksByCategory,
})(Bookcategory);
