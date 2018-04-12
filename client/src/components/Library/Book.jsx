import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import alert from 'sweetalert';

import { clearErrorMessage } from '../../actions/authAction';
import { deleteBook, borrowBook, getBooks } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** @description component that displays a single book
 *
 * @class Book
 *
 * @extends {Component}
 */
export class Book extends Component {
  /** @description Creates an instance of Book
   *
   * @param {object} props
   *
   * @memberof Book
   */
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.borrow = this.borrow.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  /** @description method that allows a user to delete a book
    *
    * @returns {*} null
    *
    * @memberof Book
    */
  handleDelete() {
    alert({
      title: 'Delete?',
      text: 'Are you sure that you want to delete this book?',
      icon: 'warning',
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteBook(this.props.id, this.refresh)
            .then((res) => {
              if (res) {
                alert('Deleted!', 'Book has been deleted!', 'success');
              } else {
                alert('Oops!', this.props.errorMessage, 'error');
              }
            });
        }
      });
  }

  /** @description refreshes book page
   *
   * @returns {*} null
   *
   * @memberof Book
   */
  refresh() {
    this.props.getBooks(8, 0, this.props.getPagination);
  }
  /** @description method that allows a user to borrow a book
   *
   * @returns {*} null
   *
   * @param {number} id
   *
   * @memberof Book
   */
  borrow(id) {
    alert({
      title: 'Rent Book?',
      text: 'Are you sure you want to Borrow this book?',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willBorrow) => {
        if (willBorrow) {
          this.props.borrowBook(id, this.refresh)
            .then((res) => {
              if (res) {
                alert('Borrowed!', 'Book has been borrowed!', 'success');
              } else {
                alert('Oops!', this.props.errorMessage, 'error');
              }
            });
        }
      });
  }

  /** @description renders the edit book component
   * 
   * @returns {JSX} JSX
   *
   * @memberof Book
   */
  render() {
    // path to the edit a book page
    const editPath = `/main/${this.props.id}/edit-book`;
    const { admin } = this.props.user;
    let status;
    let adminButtons;
    const buttonList = (
      <ul>
        <li><Link to={editPath} className='btn-floating edit-color'>
          <i className='material-icons'>edit</i></Link></li>
        <li><a onClick={this.handleDelete}
          className='btn-floating delete-color'>
          <i className='material-icons'>delete</i></a>
        </li>
      </ul>
    );

    // display available copies based on quantity
    (this.props.quantity > 1) ?
      (status = `${this.props.quantity} Copies available`) :
      (status = 'Unavailable');

    // conditionally render buttons depending on user level
    (admin === true) ? adminButtons = buttonList : adminButtons = '';

    return (
      <div className='card small col s6 m3 l3'>
        <div className='card-image'
          className='book-image waves-effect waves-block waves-light'>
          <img className='responsive-img book-image'
            src={this.props.image} alt='book image' />
        </div>
        <div id='card-book' className='card-content'>
          <div
            className='card-title row center indigo-text text-darken-2'>
            <span className="side-email col s10">{this.props.title}</span>
            <i className='material-icons activator col s1'>
              more_vert</i>
          </div>
        </div>
        <div className='card-reveal'>
          <span className='card-title indigo-text text-darken-2'>
            {this.props.title}<i className='material-icons right'>
              close</i>
          </span>
          <h6><c>By {this.props.author}</c></h6>
          <h6>{this.props.category}</h6>
          <p><c>{this.props.description}</c></p>
          <p>{status}</p>
          <div className='fixed-action-btn book-buttons'>
            <a onClick={() => { this.borrow(this.props.id); }}
              id='rent'
              className='btn-floating btn-large indigo darken-2'>RENT</a>
            {adminButtons}
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
   * @returns { array } categories
   * @returns { string } error message
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { error } = state.bookReducer;
  return {
    user,
    errorMessage: error
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  deleteBook, borrowBook, clearErrorMessage, getBooks
})(Book);
