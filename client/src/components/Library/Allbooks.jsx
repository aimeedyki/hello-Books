/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooks } from '../../actions/bookAction';
import Book from '../Library/Book.jsx';
import generic from '../../assets/images/generic.jpg';


/**
 * component that displays all books
 * 
 * @class Allbooks
 * @extends {Component}
 */
class Allbooks extends Component {
  /**
 * Creates an instance of Allbooks.
 * @param {any} props 
 * @memberof Allbooks
 */
  constructor(props) {
    super(props);
    this.state = {
      books: {},
    };
  }
  /**
  * 
  * @returns {*} void
  * @memberof Allbooks
  */
  componentWillMount() {
    this.props.getBooks();
  }
  /**
   * 
  * 
  * @returns {*} all the books in the library
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
                author={book.author} category={book.category.category}
                description={book.description} status={book.status}
                id={book.id} quantity={book.quantity} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.bookReducer.books
});

export default connect(mapStateToProps, {
  getBooks,
})(Allbooks);
