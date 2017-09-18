import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../../actions/bookAction.js';
import Allbooks from './Allbooks.jsx';




class Tab extends Component {
  constructor(props) {
    super(props);
  }
 	componentWillMount() {
    this.props.getCategories();
  }
  render() {

    return (
      <div className='row'>
				<div className='card col s12 l10 m12 offset-l2'>
          <div className="row indigo-text text-darken-2'">
            <div className="col s12">
              <ul className="tabs center">
                <li className="tab"><a href='#all'>ALL BOOKS</a></li>
                {this.props.categories.map((category) => {
                  return (
                <li className="tab" key={category.id}><a href='#{category.category}'>{category.category}</a></li>)
                })}
              </ul>
            </div>
            <div className="col s12">
              <div id='all'>
                <Allbooks/>
              </div>
              {this.props.categories.map(category => {
              return (
              <div key={category.id} id={category.category}>
                <p> this is a {category.category} tab</p>
              </div>)
              })}
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
