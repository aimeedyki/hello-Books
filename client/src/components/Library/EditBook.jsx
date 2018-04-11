import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import {
  modifyBook,
  getCategories, imageUpload, getABook
} from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** @description Edits a book
 *
 * @class EditBook
 *
 * @extends {Component}
 */
export class EditBook extends Component {
  /** @description Creates an instance of EditBook.
   *
   * @param { object } props
   *
   * @memberof EditBook
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      quantity: '',
      categoryId: '',
      image: '',
      bookId: '',
      categories: []
    };
    this.bookId = '';
    this.imageChange = this.imageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.categorySelect = this.categorySelect.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.getBookId = this.getBookId.bind(this);
    this.closePage = this.closePage.bind(this);
  }

  /** @description gets the book to be edited
   *
   * @returns {*} null
   *
   * @memberof EditBook
   */
  componentDidMount() {
    this.getBookId(this.props.location.pathname);
    this.props.getABook(this.bookId);
    this.props.getCategories();
  }

  /** @description calls the function to set the book
   *
   * @returns {*} null
   *
   * @param { object } nextProps
   *
   * @memberof EditBook
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book && nextProps.book) {
      this.setBookDetails(
        nextProps.book.title,
        nextProps.book.author,
        nextProps.book.description,
        nextProps.book.quantity,
        nextProps.book.categoryId,
        nextProps.book.image, this.bookId);
    }
  }

  /** @description calls the function to display error
   *
   * @returns {*} null
   *
   * @param { object } prevProps
   *
   * @memberof EditBook
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  /** @description populates form with book details
   *
   * @returns {*} null
   *
   * @param { string } title
   * @param { string } author
   * @param { string } description
   * @param { number } quantity
   * @param { number } categoryId
   * @param { string } image
   * @param { number } bookId
   *
   * @memberof EditBook
   */
  setBookDetails(title,
    author, description, quantity, categoryId, image, bookId) {
    this.setState({
      title, author, description, quantity, categoryId, image, bookId
    }, () => {
    });
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

  /** @description uploads image
   *
   * @returns {*} null
   *
   * @param {file} image
   *
   * @memberof EditBook
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

  /** @description sets the value of the field to state on change
   *
   *  @returns {*} null
   *
   * @param { object } event
   *
   * @memberof EditBook
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description gets the value of the select field
   *
   * @returns {*} null
   *
   * @param {any} event
   *
   * @memberof EditBook
   */
  categorySelect(event) {
    event.preventDefault();
    this.setState({ categoryId: event.target.value });
  }

  /** @description submits the editted book
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof EditBook
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.modifyBook(this.state)
      .then((response) => {
        if (response) {
          Materialize.toast('Book information has been modified!',
            4000, 'indigo darken-2');
          this.props.history.push('/main');
        }
      })
      .catch((error) => {
        if (error) {
          Materialize.toast(error.message, 4000, 'indigo darken-2');
        }
      });
  }

  /** @description displays error message if there is any
   *
   * @returns { string } error message
   *
   * @memberof EditBook
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
  /** @description gets the bookId from path
   *
   * @returns {*} null
   *
   * @param { string } pathName
   *
   * @memberof EditBook
   */
  getBookId(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[2];
    this.bookId = id;
  }

  /** @description closes the page
   *
   * @returns {*} null
   *
   * @memberof ChangeLevel
   */
  closePage() {
    this.props.history.push('/main');
  }

  /** @description renders the edit book component
   *
   *  @returns {*} component that edits a book
   *
   * @memberof EditBook
   */
  render() {
    const { book } = this.props;
    return (
      <div className="row">
        <div className="col s10 m8 l6 offset-s1 offset-m2 offset-l4">
          <div className="card row">
            <i className="material-icons red-text right close link-cursor"
              onClick={this.closePage}>
              close</i>
            <div className="col s10 m10 l8 offset-s1 offset-l2 offset-m1">
              <h5 className="center indigo-text text-darken-2 greeting">
                <b>Edit {this.state.title}</b></h5>
              <form onSubmit={this.handleFormSubmit} >
                <div className="row center edit-form">
                  <div className="input-field col s12">
                    <div className="col s12 l3 m3">
                      <p>Title</p>
                    </div>
                    <div className="col s12 l9 m9">
                      <input name="title"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.title}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s12 l3 m3">
                      <p>Author</p>
                    </div>
                    <div className="col s12 l9 m9">
                      <input name="author"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.author}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s12 l3 m3">
                      <p>Description</p>
                    </div>
                    <div className="col s12 l9 m9">
                      <input name="description"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.description}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s12 l3 m3">
                      <p>Quantity</p>
                    </div>
                    <div className="col s12 l9 m9">
                      <input name="quantity"
                        type="text" className="validate"
                        onChange={this.handleChange}
                        value={this.state.quantity}
                        required
                      />
                    </div>
                  </div>
                  <div className="col s12 l3 m3">
                    <p>Category</p>
                  </div>
                  <div className="col s12 l9 m9">
                    <select ref="category" id="category"
                      className="browser-default indigo-text text-darken-2"
                      onChange={this.categorySelect}
                      value={this.state.categoryId}
                      required>
                      {this.props.categories.map(category => (
                        (
                          <option key={category.id} value={category.id}>
                            {category.name}</option>
                        )
                      )
                      )}
                    </select>
                    <div className="file-field input-field">
                      <div className="btn indigo darken-2 margin-fix">
                        <span>Book image</span>
                        <input type="file"
                          onChange={this.imageChange}
                          name="imageFile" className="margin-fix"
                        />
                      </div>
                      <div className="file-path-wrapper input-fix">
                        <input className="file-path validate" type="text" />
                      </div>
                    </div>
                    <div className="image-container">
                      {(this.state.imageFile) ?
                        <p className="center">Uploading ....</p> : ''}
                      {this.state.image &&
                        <img src={this.state.image} alt="book Image" />
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="center">
                    <Button type="submit" name="action" label="SAVE CHANGES" />
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

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { array } categories
   * @returns { string } error message
   * @returns { array } book
   */
const mapStateToProps = state => ({
  categories: state.categoryReducer.categories,
  errorMessage: state.bookReducer.error,
  book: state.bookReducer.book,
}
);
export default connect(mapStateToProps, {
  modifyBook,
  clearErrorMessage,
  getCategories,
  getABook,
  imageUpload
})(withRouter(EditBook));
