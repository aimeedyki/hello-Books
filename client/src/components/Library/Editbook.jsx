/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { modifyBook, getCategories, getaBook } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/**
 * Edits a book
 * 
 * @class Editbook
 * @extends {Component}
 */
class Editbook extends Component {
  /**
   * Creates an instance of Editbook.
   * @param {any} props 
   * @memberof Editbook
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      quantity: '',
      categoryId: '',
      bookId: '',
      categories: []
    };
    this.bookId = '';
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.getBookId = this.getBookId.bind(this);
  }

  /**
   * gets the categories in the library
   *  @returns {*} void
   * @memberof Editbook
   */
  componentWillMount() {
    this.props.getCategories();
  }
  /**
   * gets the book to be edited
   * @returns {*} void
   * @memberof Editbook
   */
  componentDidMount() {
    this.getBookId(this.props.location.pathname);
    this.props.getaBook(this.bookId);
  }

  /**
   * 
   * @returns {*} void
   * @param {any} nextProps 
   * @memberof Editbook
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setBookDetails(nextProps.book.title,
        nextProps.book.author,
        nextProps.book.description,
        nextProps.book.quantity,
        nextProps.book.categoryId, this.bookId);
    }
  }
  /**
   * 
   *  @returns {*} void
   * @param {any} prevProps 
   * @memberof Editbook
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /**
   * 
   * @returns {*} book details
   * @param {any} title 
   * @param {any} author 
   * @param {any} description 
   * @param {any} quantity 
   * @param {any} categoryId 
   * @param {any} bookId 
   * @memberof Editbook
   */
  setBookDetails(title, author, description, quantity, categoryId, bookId) {
    this.setState({
      title, author, description, quantity, categoryId, bookId
    }, () => {
    });
  }
  /**
   * 
   *  @returns {*} void
   * @param {any} event 
   * @memberof Editbook
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * 
   *  @returns {*} void
   * @param {any} event 
   * @memberof Editbook
   */
  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ categoryId: event.target.value });
  }
  /**
   * 
   * @returns {*} void
   * @param {any} event 
   * @memberof Editbook
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.modifyBook(this.state).then((res) => {
      if (res) {
        /* eslint-disable no-undef */
        Materialize.toast('Book information has been modified!', 4000);
        this.props.history.push('/user');
      }
    });
  }

  /**
   * 
   * 
   * @returns {string} error message
   * @memberof Editbook
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
   * @returns {string} book id
   * @param {any} pathName 
   * @memberof Editbook
   */
  getBookId(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[2];
    this.bookId = id;
  }

  /**
   * 
   * 
   * @returns {*} component that edits a book
   * @memberof Editbook
   */
  render() {
    const { book } = this.props;

    return (
      <div className='row'>
        <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l3 '>
          <div className='card row'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5 className='center indigo-text text-darken-2'>EDIT BOOK</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input placeholder='Title' name='title'
                      type='text' className='validate'
                      onChange={this.handleChange}

                      value={this.state.title}
                      required
                    />
                    <label>Title</label>
                  </div>
                  <div className='input-field col s12'>
                    <input placeholder='Author' name='author'
                      type='text' className='validate'
                      onChange={this.handleChange}

                      value={this.state.author}
                      required
                    />
                    <label>Author</label>
                  </div>
                  <div className='input-field col s12'>
                    <input placeholder='Description' name='description'
                      type='text' className='validate'
                      onChange={this.handleChange}

                      value={this.state.description}
                      required
                    />
                    <label>Description</label>
                  </div>
                  <div className='input-field col s12'>
                    <input placeholder='Quantity' name='quantity'
                      type='text' className='validate'

                      onChange={this.handleChange}
                      value={this.state.quantity}
                      required
                    />
                    <label>Quantity</label>
                  </div>
                  <select ref='category' id='category'
                    className='browser-default indigo-text text-darken-2'
                    onChange={this.handleSelectChange}
                    value={this.state.value}
                    required>
                    {this.props.categories.map(category => (
                      (
                        <option key={category.id} value={category.id}>
                          {category.category}</option>
                      )
                    )
                    )}
                  </select>
                  <label>Change level</label>
                </div>
                <div className='row'>
                  <div className='col s5 m4 l4 offset-l2 offset-m2'>
                    <Button type='submit' name='action' label='SAVE CHANGES' />
                  </div>
                  <div className='col s5 m4 l4'>
                    <Button type='reset' icon='cancel'
                      name='action' label='CANCEL' />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.bookReducer.categories,
  errorMessage: state.bookReducer.error,
  book: state.bookReducer.book
}
);

export default connect(mapStateToProps, {
  modifyBook,
  clearErrorMessage,
  getCategories,
  getaBook
})(withRouter(Editbook));
