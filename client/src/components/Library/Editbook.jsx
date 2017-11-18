import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import {
  modifyBook,
  getCategories, getaBook, imageUpload
} from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** Edits a book
 * @class Editbook
 * @extends {Component}
 */
class Editbook extends Component {
  /** Creates an instance of Editbook.
   * @param {*} props
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
      image: '',
      bookId: '',
      categories: []
    };
    this.bookId = '';
    this.imageChange = this.imageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.setBookDetails = this.setBookDetails.bind(this);
    this.getBookId = this.getBookId.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  /** gets the categories in the library
     *  @returns {*} null
     * @memberof Editbook
     */
  componentWillMount() {
    this.props.getCategories();
  }
  /** gets the book to be edited
   * @returns {*} null
   * @memberof Editbook
   */
  componentDidMount() {
    this.getBookId(this.props.location.pathname);
    this.props.getaBook(this.bookId);
  }
  /** @returns {*} null
     * @param {*} nextProps
     * @memberof Editbook
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setBookDetails(
        nextProps.book.title,
        nextProps.book.author,
        nextProps.book.description,
        nextProps.book.quantity,
        nextProps.book.categoryId,
        nextProps.book.image, this.bookId);
    }
  }
  /** @returns {*} void
   * @param {*} prevProps
   * @memberof Editbook
   */
  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }
  /** @returns {*} book details
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @param {number} quantity
   * @param {number} categoryId
   * @param {string} image
   * @param {string} bookId
   * @memberof Editbook
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
  /** @returns {*} null
   * @param {file} image
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
   * @memberof Editbook
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /** @returns {*} null
   * @param {any} event
   * @memberof Editbook
   */
  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ categoryId: event.target.value });
  }
  /** @returns {*} null
   * @param {*} event
   * @memberof Editbook
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.modifyBook(this.state)
      .then((response) => {
        if (response) {
          /* eslint-disable no-undef */
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
   * @memberof Editbook
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
  /** @returns {string} book id
   * @param {any} pathName
   * @memberof Editbook
   */
  getBookId(pathName) {
    const stringArray = pathName.split('/');
    const id = stringArray[2];
    this.bookId = id;
  }
  /** @returns {*} void
   * @memberof Editbook
   */
  onCancel() {
    this.props.history.push('/user');
  }
  /** @returns {*} component that edits a book
   * @memberof Editbook
   */
  render() {
    const { book } = this.props;
    return (
      <div className="row">
        <div className="col s10 m8 l6 offset-s1 offset-m2 offset-l4">
          <div className="card row">
            <div className="margin-fix col s10 m8 l8 offset-s1 offset-l2">
              <h5 className="center indigo-text text-darken-2">
                <b>Edit Book</b></h5>
              <form onSubmit={this.handleFormSubmit} >
                <div className="row edit-form">
                  <div className="input-field col s12">
                    <div className="col s3">
                      <p>Title</p>
                    </div>
                    <div className="col s9">
                      <input name="title"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.title}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s3">
                      <p>Author</p>
                    </div>
                    <div className="col s9">
                      <input name="author"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.author}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s3">
                      <p>Description</p>
                    </div>
                    <div className="col s9">
                      <input name="description"
                        type="text" className="validate"
                        onChange={this.handleChange}

                        value={this.state.description}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <div className="col s3">
                      <p>Quantity</p>
                    </div>
                    <div className="col s9">
                      <input name="quantity"
                        type="text" className="validate"
                        onChange={this.handleChange}
                        value={this.state.quantity}
                        required
                      />
                    </div>
                  </div>
                  <div className="col s3">
                    <p>Category</p>
                  </div>
                  <div className="col s9">
                    <select ref="category" id="category"
                      className="browser-default indigo-text text-darken-2"
                      onChange={this.handleSelectChange}
                      value={this.state.value}
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
// function to connect the state from the store to the props of the component
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
  getaBook,
  imageUpload
})(withRouter(Editbook));
