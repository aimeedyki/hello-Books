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
  }
  /** gets the books in a category
   * @returns {*} void
   * @memberof Bookcategory
   */
  componentDidMount() {
    this.props.getBooksByCategory(this.props.categoryId);
  }
  /** renders the books in a category
   * @returns {*} category component
   * @memberof Bookcategory
   */
  render() {
    return (
      <div className='row'>
        {this.props.books.map(book => (
          <div key={book.id}>
            <Book image={generic} title={book.title}
              author={book.author} category={book.category}
              description={book.description} status={book.status}
              id={book.id} quantity={book.quantity} />
          </div>
        )
        )}
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = state => (
  {
    books: state.bookReducer.bookCategory.books
  }
);

export default connect(mapStateToProps, {
  getBooksByCategory,
})(Bookcategory);
