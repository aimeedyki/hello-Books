import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addNewCategory } from '../../actions/bookAction';

import Button from '../Common/Button.jsx';

/** @description adds a new category to the library
 *
 * @class AddCategory
 *
 * @extends {Component}
 */
export class AddCategory extends Component {
  /** @description Creates an instance of AddCategory
   *
   * @param {object} props
   *
   * @memberof AddCategory
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** @description sets the value of the field to state on change
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof AddCategory
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description submits the form to add a category
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof AddCategory
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.addNewCategory(this.state)
      .then((response) => {
        if (response) {
          Materialize.toast('Category added Successfully!',
            4000, 'indigo darken-2');
          this.props.history.push('/main/admin-dashboard');
        }
      })
      .catch((error) => {
        if (error) {
          Materialize.toast(error.message, 4000, 'indigo darken-2');
        }
      });
  }

  /** @description displays AddCategory component
   *
   * @returns {JSX} JSX
   *
   * @memberof AddCategory
   */
  render() {
    return (
      <div className='row'>
        <div className='col s10 m8 l4 offset-s1 offset-m2 offset-l5 '>
          <div className='card row cat-card'>
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

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { * } null
   */
const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps, {
  addNewCategory
})(withRouter(AddCategory));
