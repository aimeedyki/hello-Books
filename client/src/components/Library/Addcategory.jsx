import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , withRouter} from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction.js';
import { addNewCategory } from '../../actions/bookAction.js';

import Button from '../Common/Button.jsx';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage !== this.props.errorMessage) {
      this.renderAlert();
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.addNewCategory(this.state).then(res => {
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
        <div className='col s10 m8 l4 offset-s1 offset-m2 offset-l4 '>
          <div className='card row'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5 className='center indigo-text text-darken-2'>ADD A NEW CATEGORY</h5>
              <form onSubmit={this.handleFormSubmit}>
                <div className='row'>
                  <div className='input-field col s12'>
                    <input name='category' type='text' className='validate'
                      onChange={this.handleChange}
                      value={this.state.category}
                      required
                    />
                    <label>Category title</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 m4 l4 offset-l2 offset-m4'>
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

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps, {
  addNewCategory,
  clearErrorMessage
})(withRouter(AddCategory));
