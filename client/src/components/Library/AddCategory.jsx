/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { addNewCategory } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** adds a new category to the library
 * @class AddCategory
 * @extends {Component}
 */
class AddCategory extends Component {
  /** Creates an instance of AddCategory.
   * @param {any} props
   * @memberof AddCategory
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  /** @returns {*} void
   * @param {any} event
   * @memberof AddCategory
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @returns {*} void
   * @param {any} event
   * @memberof AddCategory
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.addNewCategory(this.state)
      .then((response) => {
        if (response) {
          Materialize.toast('Category added Successfully!',
            4000, 'indigo darken-2');
          this.props.history.push('/user/dashboard');
        }
      })
      .catch((error) => {
        if (error) {
          Materialize.toast(error.message, 4000, 'indigo darken-2');
        }
      });
  }

  /** @returns {string} error message
   * @memberof AddCategory
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

  /** @returns {*} add category component
   * @memberof AddCategory
   */
  render() {
    return (
      <div className='row'>
        <div className='col s10 m8 l4 offset-s1 offset-m2 offset-l5 '>
          <div className='card row catCard'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5 className='center greeting indigo-text text-darken-2'>
                Add A New Category</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input name='name' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.name}
                      required
                    />
                    <label>Category title</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='center'>
                    <Button type='submit' name='action' label='Add Category' />
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
  state
});

export default connect(mapStateToProps, {
  addNewCategory,
  clearErrorMessage
})(withRouter(AddCategory));
