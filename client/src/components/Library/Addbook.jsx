/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { addBook, getCategories, imageUpload } from '../../actions/bookAction';
import Button from '../Common/Button.jsx';

/** Adds a book to library
 * @class AddBook
 * @extends {Component}
 */
class AddBook extends Component {
  /** Creates an instance of AddBook.
   * @param {*} props
   * @memberof AddBook
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      imageFile: null,
      image: '',
      description: '',
      quantity: '',
      categoryId: '',
      categories: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  /** gets the categories to be selected
   * @returns {*} null
   * @memberof AddBook
   */
  componentWillMount() {
    this.props.getCategories();
  }
  /** @returns {*} null
   * @param {*} event
   * @memberof AddBook
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** @returns {*} null
   * @param {*} event
   * @memberof AddBook
   */
  imageChange(event) {
    this.setState({
      imageFile: event.target.files[0],
    });
    this.handleImageUpload(event.target.files[0]);
  }
  /** @returns {*} null
   * @param {*} image
   * @memberof AddBook
   */
  handleImageUpload(image) {
    this.props.imageUpload(image)
      .end((error, response) => {
        this.setState({
          image: response.body.secure_url,
          imageFile: null,
        });
      });
  }
  /** @returns {*} null
   * @param {*} event
   * @memberof AddBook
   */
  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ categoryId: event.target.value });
  }

  /** @returns {*} null
   * @param {any} prevProps
   * @memberof AddBook
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  /** submits a form and adds book to library
   * @returns {*} null
   * @param {*} event
   * @memberof AddBook
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.addBook(this.state).then((res) => {
      if (res) {
        /* eslint-disable no-undef */
        Materialize.toast('Book added Successfully!', 4000, 'indigo darken-2');
        this.props.history.push('/user');
      }
    })
      .catch((error) => {
        if (error) {
          /* eslint-disable no-undef */
          Materialize.toast(error.message, 4000, 'indigo darken-2');
        }
      });
  }

  /** @returns {string} error message
   * @memberof AddBook
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000,
          'indigo darken-2', () => {
            this.props.clearErrorMessage();
          })
      );
    }
  }

  /** @returns {*} adds book component
   * @memberof AddBook
   */
  render() {
    return (
      <div className='row'>
        <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l4 '>
          <div className='card row'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5 className='center greeting indigo-text text-darken-2'><b>
                Add A New Book</b></h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input name='title' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.title}
                      required
                    />
                    <label>Title</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='author' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.author}
                      required
                    />
                    <label>Author</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='description' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.description}
                      required
                    />
                    <label>Description</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='quantity' type='number' className='validate'
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
                    <option defaultValue='' selected disabled>
                      Select a category</option>
                    {this.props.categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}</option>
                    ))}
                  </select>
                  <div className="file-field input-field">
                    <div className="btn indigo darken-2">
                      <span>Book image</span>
                      <input type="file"
                        onChange={this.imageChange} name="imageFile" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                  <div className="image-container">
                    {(this.state.imageFile && !this.state.image) ?
                      <p className="center">Uploading ....</p> : ''}
                    {this.state.image &&
                      <img src={this.state.image} alt="book Image" />
                    }
                  </div>
                </div>
                <div className='row'>
                  <div className='center'>
                    <Button type='submit' name='action' label='Add book' />
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
  errorMessage: state.bookReducer.error
});

export default connect(mapStateToProps, {
  addBook,
  clearErrorMessage,
  getCategories,
  imageUpload
})(withRouter(AddBook));
