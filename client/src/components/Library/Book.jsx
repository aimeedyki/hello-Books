/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { displayUserpage } from '../../actions/userAction';
import { clearErrorMessage } from '../../actions/authAction';
import { deleteBook, borrowBook } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/**
 * component that displays a single book
 * 
 * @class Book
 * @extends {Component}
 */
class Book extends Component {
  /**
   * Creates an instance of Book.
   * @param {any} props 
   * @memberof Book
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.borrow = this.borrow.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  /**
   * 
   * @returns {*} void
   * @memberof Book
   */
  componentDidMount() {
    const { userId, level } = this.props;
    this.setState({
      userId
    });
  }

  /**
   * calls function to display errors if they exist
   * @returns {*} void
   * @param {any} prevProps 
   * @memberof Book
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  /**
   *  method that allows a user to delete a book
   * @returns {*} void
   * @param {any} id 
   * @memberof Book
   */
  handleClick(id) {
    /* eslint-disable no-alert */
    const shouldDelete = confirm('Are you sure you want to delete this book');
    if (shouldDelete === true) {
      /* eslint-disable no-undef */
      this.props.deleteBook(id).then((res) => {
        if (res) {
          Materialize.toast('Book has been deleted!', 4000);
          window.location.reload();
        }
      }).catch(error => res.status(500).send(error.message));
    }
  }

  /**
   * method that allows a user to borrow a book
   * @returns {*} void
   * @param {any} id 
   * @param {any} userId 
   * @memberof Book
   */
  borrow(id, userId) {
    const shouldBorrow = confirm('Are you sure you want to Borrow this book');
    if (shouldBorrow === true) {
      this.props.borrowBook(id, userId).then((res) => {
        if (res) {
          Materialize.toast('Thank you for borrowing!!', 4000);
        }
      }).catch(error => res.status(500).send(error.message));
    }
  }

  /**
   *  display errors if they exist
   * 
   * @returns {string} error message
   * @memberof Book
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000, '', () => {
          this.props.clearErrorMessage();
        })
      );
    }
  }

  /**
   * 
   * 
   * @returns {*} book to edit
   * @memberof Book
   */
  render() {
    // path to edit a book page
    const editPath = `/user/${this.props.id}/edit-book`;
    const { userId, level } = this.props.user;
    let status;
    let adminButtons;

    /* eslint-disable no-unused-expressions */
    // display available copies based on quantity
    (this.props.quantity > 1) ?
      (status = `${this.props.quantity} COPIES AVAILABLE`) :
      (status = 'UNAVAILABLE');

    // conditionally render buttons depending on user level
    (level === 'admin') ? adminButtons = (
      <ul>
        <li><Link to={editPath} className='btn-floating indigo darken-2'>
          <i className='material-icons'>edit</i></Link></li>
        <li><a onClick={() => { this.handleClick(this.props.id); }}
          className='btn-floating indigo darken-2'>
          <i className='material-icons'>delete</i></a></li>
      </ul>
    ) : adminButtons = '';

    return (
      <div className='card small col s6 m3 l3'>
        <div className='card-image'
          className='book-image waves-effect waves-block waves-light'>
          <img className='activator responsive-img'
            src={this.props.image} alt='book image' />
        </div>
        <div className='card-content'>
          <span className='card-title activator grey-text text-darken-4'>
            <i className='material-icons left'>
              more_vert</i>{this.props.title}</span>
        </div>
        <div className='card-reveal'>
          <span className='card-title grey-text text-darken-4'>
            {this.props.title}<i className='material-icons right'>
              close</i></span>
          <h5>By {this.props.author}</h5>
          <h6>{this.props.category}</h6>
          <p>{this.props.description}</p>
          <p>{status}</p>
          <div className='fixed-action-btn'>
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
  const { user } = state.userReducer;
  return {
    user,
    errorMessage: state.bookReducer.error
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  deleteBook, borrowBook, displayUserpage, clearErrorMessage
})(Book);
