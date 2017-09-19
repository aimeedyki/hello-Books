import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction.js';
import { modifyBook, getCategories, getaBook } from '../../actions/bookAction.js';

import Button from '../Common/Button.jsx';

class Editbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      quantity: '',
      categoryId: '',
      categories: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.setBookDetails = this.setBookDetails.bind(this);
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getaBook(this.props.id);
    this.setBookDetails(this.props.book.title,
      this.props.book.author,
      this.props.book.description,
      this.props.book.quantity,
      this.props.book.categoryId)
  }

  setBookDetails(title, author, description, quantity, categoryId) {
    this.setState({ title, author, description, quantity, categoryId }, () => {
    })
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange(event) {
    event.preventDefault();
    this.setState({ categoryId: event.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.modifyBook(this.state).then(res => {
      if (res) {
        this.props.history.push('/user')
      }
    })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Materialize.toast(this.props.errorMessage, 4000, '', () => {
          this.props.clearErrorMessage()
        })
      );
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l3 '>
          <div className='card row'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5 className='center indigo-text text-darken-2'>EDIT BOOK</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input name='title' type='text' className='validate'
                      onChange={this.handleChange}
                      defaultValue={this.state.title}
                      value={this.state.title}
                      required
                    />
                    <label>Title</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='author' type='text' className='validate'
                      onChange={this.handleChange}
                      defaultValue={this.state.author}
                      value={this.state.author}
                      required
                    />
                    <label>Author</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='description' type='text' className='validate'
                      onChange={this.handleChange}
                      defaultValue={this.state.description}
                      value={this.state.description}
                      required
                    />
                    <label>Description</label>
                  </div>
                  <div className='input-field col s12'>
                    <input name='quantity' type='text' className='validate'
                      defaultValue={this.state.quantity}
                      onChange={this.handleChange}
                      value={this.state.quantity}
                      required
                    />
                    <label>Quantity</label>
                  </div>
                  <select ref='category' id='category' className='browser-default indigo-text text-darken-2'
                    onChange={this.handleSelectChange}
                    value={this.state.value}
                    required>
                    {this.props.categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>{category.category}</option>
                      )
                    })}
                  </select>
                </div>
                <div className='row'>
                  <div className='col s5 m4 l4 offset-l2 offset-m2'>
                    <Button type='submit' name='action' label='SAVE CHANGES' />
                  </div>
                  <div className='col s5 m4 l4'>
                    <Button type='reset' icon='cancel' name='action' label='CANCEL' />
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

const mapStateToProps = (state) => {

  return {
    categories: state.bookReducer.categories,
    errorMessage: state.bookReducer.error,
    book: state.bookReducer.book

  };

}

export default connect(mapStateToProps, {
  modifyBook,
  clearErrorMessage, getCategories,getaBook
})(withRouter(Editbook));
