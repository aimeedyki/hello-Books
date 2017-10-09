/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayUserpage } from '../../actions/userAction';
import { getCategories, getBooksByCategory } from '../../actions/bookAction';
import Allbooks from './Allbooks.jsx';
import Bookcategory from './Bookcategory.jsx';

/**
 * Component that holds all the books
 * and the tab that displays the categories
 * @class Tab
 * @extends {Component}
 */
class Tab extends Component {
  /**
   * Creates an instance of Tab.
   * @param {any} props 
   * @memberof Tab
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      bookcategory: '',
      id: ''
    };
  }

  /**
   * calls methods that gets all categories
   * @returns {*} void
   * @memberof Tab
   */
  componentWillMount() {
    this.props.getCategories();
    this.props.displayUserpage();
  }

  /** setting category id to display
   * @returns {*} void
   * @param {any} id 
   * @param {any} category 
   * @memberof Tab
   */
  handleClick(id, category) {
    this.setState({ id, bookcategory: category }, () => {
    });
  }

  /**
   * @returns {*} library component
   * @memberof Tab
   */
  render() {
    const { level } = this.props.user;
    // displays add book button only for admin users
    let addBookButton;
    /* eslint-disable no-unused-expressions */
    (level === 'admin') ? addBookButton = (
      <div className='fixed-action-btn'>
        <Link to='/user/books'
          className='btn-floating btn-large indigo darken-2'>
          <i className='large material-icons'>add</i></Link>
      </div>) : addBookButton = '';
    // renders books in the category selected
    let Bookcategorycomponent;
    (this.state.id === '') ? Bookcategorycomponent = '' :
      (Bookcategorycomponent = <Bookcategory categoryId={this.state.id} />);

    return (
      <div className='row'>
        <div className='card col s12 l10 m12 offset-l2'>
          <div className='row indigo-text text-darken-2'>
            <div className='col s12'>
              <ul className='tabs center'>
                <li className='tab'><a href='#all'>ALL BOOKS</a></li>
                {this.props.categories.map(category => (
                  (
                    <li className='tab' key={category.id}><a onClick={() => {
                      this.handleClick(category.id, category.category);
                    }} href={`#${category.category}`}>
                      {category.category}</a></li>)
                )
                )}
              </ul>
            </div>
            <div className='col s12'>
              <div id='all'>
                <Allbooks />
              </div>
              <div id={this.state.bookcategory}>
                {Bookcategorycomponent}
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
  const { user } = state.userReducer;
  return {
    categories: state.bookReducer.categories,
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories, displayUserpage
})(withRouter(Tab));
