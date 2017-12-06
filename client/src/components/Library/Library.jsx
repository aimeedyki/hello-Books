import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getBooksByCategory } from '../../actions/bookAction';
import ConnectedAllBooks from './AllBooks.jsx';

/** Component that holds all the books
 * and the Library that displays the categories
 * @class Library
 * @extends {Component}
 */
export class Library extends Component {
  /** @returns {*} library component
   * @memberof Library
   */
  render() {
    const { admin } = this.props.user;
    // displays add book button only for admin users
    let addBookButton;
    const addButton = (
      <div className="fixed-action-btn">
        <Link to="/main/add-book"
          className="btn-floating btn-large indigo darken-2">
          <i className="large material-icons">add</i></Link>
      </div>);

    (admin === true) ? addBookButton = addButton : addBookButton = '';

    return (
      <div className="row">
        <div className='card white col s12 l9 offset-l2 library'>
          <h4 className="cat-name center">All Books</h4>
          <div className="row indigo-text text-darken-2">
            <div className="col s12">
              <div>
                <ConnectedAllBooks />
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
  return {
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories
})(withRouter(Library));
