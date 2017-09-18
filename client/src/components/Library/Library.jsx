import React, { Component } from 'react';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../../actions/bookAction.js';
import Allbooks from '../Library/Allbooks.jsx';
import Tab from './Tab.jsx';


class Library extends Component {
	constructor(props) {
		super(props);
	}	
	componentWillMount() {
    this.props.getCategories();
  }
	render() {
		const data = [{ content: Allbooks, id: 'all', idLink: '#all', title: 'ALL BOOKS' },
		{ content: Thriller, id: 'thriller', idLink: '#thriller', title: 'THRILLER' },
		{ content: Romance, id: 'romance', idLink: '#romance', title: 'ROMANCE' }];
		return (
			<div className='row'>
				<div className='card col s12 l10 m12 offset-l2'>
					<Tab data={data} />
					<div className="fixed-action-btn">
						<Link to='/user/books' className="btn-floating btn-large indigo darken-2"><i className='large material-icons'>add</i></Link>
					</div>
				</div>
			</div>
		);
	}
}


