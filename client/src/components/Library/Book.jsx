/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import alert from 'sweetalert';

import { displayUserpage } from '../../actions/userAction';
import { clearErrorMessage } from '../../actions/authAction';
import { deleteBook, borrowBook, getBooks } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** component that displays a single book
 * @class Book
 * @extends {Component}
 */
class Book extends Component {
  /** Creates an instance of Book.
   * @param {any} props
   * @memberof Book
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.borrow = this.borrow.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  /** @returns {*} void
   * @memberof Book
   */
  componentDidMount() {
    const { userId, level } = this.props;
    this.setState({
      userId
    });
  }
  /** method that allows a user to delete a book
     * @returns {*} void
     * @param {any} id
     * @memberof Book
     */
  handleClick() {
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
   * @returns {*} void
   * @memberof Book
   */
  refresh() {
    this.props.getBooks(8, 0);
  }
  /** method that allows a user to borrow a book
   * @returns {*} void
   * @param {any} id
   * @param {any} userId
   * @memberof Book
   */
  borrow(id, userId) {
    alert({
      title: 'Rent Book?',
      text: 'Are you sure you want to Borrow this book?',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willBorrow) => {
        if (willBorrow) {
          this.props.borrowBook(id, userId, this.refresh)
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

  /** @returns {*} book to edit
   * @memberof Book
   */
  render() {
    // path to edit a book page
    const editPath = `/user/${this.props.id}/edit-book`;
    const { userId, admin } = this.props.user;
    let status;
    let adminButtons;

    /* eslint-disable no-unused-expressions */
    // display available copies based on quantity
    (this.props.quantity > 1) ?
      (status = `${this.props.quantity} Copies available`) :
      (status = 'Unavailable');

    // conditionally render buttons depending on user level
    (admin) ? adminButtons = (
      <ul>
        <li><Link to={editPath} className='btn-floating editColor'>
          <i className='material-icons'>edit</i></Link></li>
        <li><a onClick={this.handleClick}
          className='btn-floating deleteColor'>
          <i className='material-icons'>delete</i></a>
        </li>
      </ul>
    ) : adminButtons = '';

    return (
      <div className='card small col s6 m3 l3'>
        <div className='card-image'
          className='book-image waves-effect waves-block waves-light'>
          <img className='activator responsive-img'
            src={this.props.image} alt='book image' />
        </div>
        <div id='card-book' className='card-content'>
          <span className='card-title activator indigo-text text-darken-2'>
            <i className='material-icons left'>
              more_vert</i>{this.props.title}</span>
        </div>
        <div className='card-reveal'>
          <span className='card-title indigo-text text-darken-2'>
            {this.props.title}<i className='material-icons right'>
              close</i></span>
          <h6><c>By {this.props.author}</c></h6>
          <h6>{this.props.category}</h6>
          <p><c>{this.props.description}</c></p>
          <p>{status}</p>
          <div className='fixed-action-btn book-buttons'>
            <a onClick={() => { this.borrow(this.props.id, userId); }}
              className='btn-floating btn-large indigo darken-2'>RENT</a>
            {adminButtons}
          </div>
        </div>
      </div>
    );
  }
}

// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
    errorMessage: state.bookReducer.error
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  deleteBook, borrowBook, clearErrorMessage, getBooks
})(Book);
