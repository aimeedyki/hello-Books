import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories, getBooksByCategory } from '../../actions/bookAction.js';
import Allbooks from './Allbooks.jsx';
import Bookcategory from './Bookcategory.jsx';



class Tab extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      bookcategory: '',
      id: ''
    }
  }
  componentWillMount() {
    this.props.getCategories();
  }
  handleClick(id, category) {

    this.setState({ id, bookcategory: category }, () => {

    })
  }


  render() {
    let Bookcategorycomponent;
    (this.state.id === '')? Bookcategorycomponent = '': Bookcategorycomponent= <Bookcategory categoryId={this.state.id} />;
    
    return (
      <div className='row'>
        <div className='card col s12 l10 m12 offset-l2'>
          <div className="row indigo-text text-darken-2'">
            <div className="col s12">
              <ul className="tabs center">
                <li className="tab"><a href='#all'>ALL BOOKS</a></li>
                {this.props.categories.map((category) => {
                  return (
                    <li className="tab" key={category.id}><a onClick={() => { this.handleClick(category.id, category.category) }} href={`#${category.category}`}>{category.category}</a></li>)
                })}
              </ul>
            </div>
            <div className="col s12">
              <div id='all'>
                <Allbooks />
              </div>
              <div id={this.state.bookcategory}>
                {Bookcategorycomponent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    categories: state.bookReducer.categories
  };

}

export default connect(mapStateToProps, {
  getCategories,
})(withRouter(Tab));
