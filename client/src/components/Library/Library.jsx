import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Editbook from './Editbook.jsx';
import Addbook from './Addbook.jsx';
import Tab from '../Common/Tab.jsx';
import Book from '../Library/Book.jsx';

const books = [{ title: 'the gods must be crazy', image: require('../../assets/images/davinci.jpg'), author: 'chinua achebe', category: 'THRILLER', description: 'A tales by moonlight', status: 'Available' },
{ title: 'Love yesterday now', image: require('../../assets/images/dolphin.jpg'), author: 'Joan Smith', category: 'ROMANCE', description: 'A love story', status: 'Out of stock' },
{ title: 'Mercy death sting', image: require('../../assets/images/fiftysf.png'), author: 'Grey Joy', category: 'THRILLER', description: 'Deadly tale', status: 'Available' },
{ title: 'Romeo and Juliet', image: require('../../assets/images/magicobt.jpg'), author: 'Danny Cage', category: 'ROMANCE', description: 'Love and death', status: 'Available' },
{ title: 'Vampire diaries', image: require('../../assets/images/whistler.png'), author: 'Dan Brown', category: 'THRILLER', description: 'Vampire tale', status: 'Available' }];

class Allbooks extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		window.$(document).ready(function () {
			window.$('.modal').modal();
		});
		return (
			<div className="row">

				{books.map((book) => {
					return (
						<div key={book.title}>
							<Book image={book.image} title={book.title} author={book.author} category={book.category}
								description={book.description} status={book.status} />
							<div className='row modal' id='editbook'>
								<Editbook />
							</div>
						</div>
					)
				})}

			</div>
		);
	}
}

class Thriller extends Component {
	render() {
		return (
			<h1>this is thriller category</h1>
		)
	}
}

class Romance extends Component {
	render() {
		return (
			<h1>this is romance category</h1>
		)
	}
}

class Library extends Component {
	render() {
		const data = [{ content: Allbooks, id: 'all', idLink: '#all', title: 'ALL BOOKS' },
		{ content: Thriller, id: 'thriller', idLink: '#thriller', title: 'THRILLER' },
		{ content: Romance, id: 'romance', idLink: '#romance', title: 'ROMANCE' }];
		return (
			<div className="row">
				<div className="card col s12 l10 m12 offset-l2">
					<Tab data={data} />
					<div className="fixed-action-btn">
						<a href="#addbook" className="btn-floating btn-large indigo darken-2 modal-trigger">
							<i className="large material-icons">add</i>
						</a>
					</div>
				</div>
				<div className='modal' id='addbook'>
					<Addbook />
				</div>
			</div>

		);
	}
}

Library = withRouter(Library);
export default Library;
