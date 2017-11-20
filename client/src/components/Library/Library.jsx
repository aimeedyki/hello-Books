/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getBooksByCategory } from '../../actions/bookAction';
import Allbooks from './Allbooks.jsx';
import Bookcategory from './Bookcategory.jsx';

/** Component that holds all the books
 * and the Library that displays the categories
 * @class Library
 * @extends {Component}
 */
class Library extends Component {
  /** Creates an instance of Library.
   * @param {*} props
   * @memberof Library
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      bookcategory: '',
      id: '',
    };
  }

  /** calls methods that gets all categories
   * @returns {*} null
   * @memberof Library
   */
  componentWillMount() {
    this.props.getCategories();
  }
  /** setting category id to display
     * @returns {*} null
     * @param {number} id
     * @param {string} category
     * @memberof Library
     */
  handleClick(id, category) {
    this.setState({ id, bookcategory: category }, () => {
    });
  }

  /** @returns {*} library component
   * @memberof Library
   */
  render() {
    const { admin } = this.props.user;
    // displays add book button only for admin users
    let addBookButton;
    /* eslint-disable no-unused-expressions */
    (admin === true) ? addBookButton = (
      <div className="fixed-action-btn">
        <Link to="/user/add-book"
          className="btn-floating btn-large indigo darken-2">
          <i className="large material-icons">add</i></Link>
      </div>) : addBookButton = '';

    return (
      <div className="row">
        <div className='card white col s12 l9 offset-l2 library'>
          <h4 className="cat-name center">All Books</h4>
          <div className="row indigo-text text-darken-2">
            <div className="col s12">
              <div>
                <Allbooks />
              </div>
              {addBookButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { categories } = state.bookReducer;
  return {
    categories,
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories
})(withRouter(Library));
