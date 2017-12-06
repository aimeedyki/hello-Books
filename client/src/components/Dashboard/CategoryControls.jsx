import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import alert from 'sweetalert';

import {
  getCategories,
  getBooks,
  editCategory,
  deleteCategory
} from '../../actions/bookAction';
/**
 * 
 * 
 * @class CategoryControls
 * @extends {Component}
 */
export class CategoryControls extends Component {
  /**
   * Creates an instance of CategoryControls.
   * @param {any} props
   * @memberof CategoryControls
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryName: {}
    };
    this.submitEdit = this.submitEdit.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  /**
   * 
   * @returns {*} null
   * @param {any} nextProps
   * @memberof CategoryControls
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      nextProps.categories.map(category => this.setState(
        { [category.name]: category.name }));
    }
  }
  /**
   *  @returns {*} null
   * @param {*} categoryId
   * @memberof CategoryControls
   */
  handleCategoryEdit(categoryId) {
    $(`#${categoryId}-disabled`).prop('disabled', false);
    $(`#submit-${categoryId}`).show();
    $(`#cancel-${categoryId}`).show();
    this.props.categories.map(category => $(`#edit-${categoryId}`).hide());
  }
  /**
   * 
   * @returns {*} null
   * @param {any} name
   * @param {any} categoryId
   * @memberof CategoryControls
   */
  cancel(name, categoryId) {
    $(`#submit-${categoryId}`).hide();
    $(`#cancel-${categoryId}`).hide();
    this.setState({ [name]: name });
    this.props.categories.map(category => $(`#edit-${category.id}`).show());
  }
  /**
   * @returns {*} null
   * @param {any} categoryId
   * @param {any} categoryName
   * @memberof CategoryControls
   */
  submitEdit(categoryId, categoryName) {
    this.props.editCategory(categoryId, categoryName)
      .then((response) => {
        if (response) {
          this.props.history.push('/main/dashboard');
        }
      });
  }
  /**
   * @param {any} event
   * @memberof CategoryControls
   * @returns {void}
   */
  updateForm(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *  @returns {*} null
   * @param {*} categoryId
   * @memberof CategoryControls
   */
  handleDelete(categoryId) {
    alert({
      title: 'Delete?',
      text: 'Are you sure that you want to delete this category?',
      icon: 'warning',
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteCategory(categoryId)
            .then((res) => {
              if (res) {
                alert('Deleted!', 'Category has been deleted!', 'success');
                this.props.history.push('/main/dashboard');
              } else {
                alert('Oops!', this.props.errorMessage, 'error');
              }
            });
        }
      });
  }
  /**
   * @returns {*} dashboard
   * @memberof CategoryControls
   */
  render() {
    return (
      <div>
        <h5 className='center greeting indigo-text text-darken-2'><b>
          Category Controls</b></h5>
        <ul>
          <li><NavLink to="/main/category"
            className="blue-text text-lighten-2 link-cursor">
            Add a New Category</NavLink></li>
          {!this.props.categories ? <p className="black-text center">
            No categories yet! Add one</p> :
            <div>
              {
                this.props.categories.map(category => (
                  (
                    <li key={category.id}>
                      <input disabled className="category-input-fix black-text"
                        id={`${category.id}-disabled`}
                        name={category.name}
                        value={this.state[category.name]}
                        onChange={this.updateForm}>
                      </input>
                      <button type="submit"
                        className="button-fix btn indigo darken-2"
                        style={{ display: 'none' }}
                        id={`submit-${category.id}`}
                        onClick={() => this.submitEdit(
                          category.id, this.state[category.name])}>Save
                      </button>
                      <button type="submit"
                        className="button-fix btn orange darken-4"
                        style={{ display: 'none' }}
                        id={`cancel-${category.id}`}
                        onClick={() =>
                          this.cancel(category.name, category.id)}>Cancel
                      </button>
                      <i className='left-fix material-icons link-cursor'
                        onClick={() => this.handleCategoryEdit(category.id)}
                        id={`edit-${category.id}`}>edit</i>
                      <i id={`delete-${category.id}`}
                        className='material-icons link-cursor'
                        onClick={() => this.handleDelete(category.id)}>
                        delete</i></li>)
                )
                )
              }</div>}
        </ul>
      </div>
    );
  }
}

// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { categories, error } = state.categoryReducer;
  return {
    categories,
    user,
    errorMessage: error
  };
};

export default connect(mapStateToProps, {
  getCategories, getBooks, editCategory, deleteCategory
})(withRouter(CategoryControls));
