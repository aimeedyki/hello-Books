import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getBooks} from '../../actions/bookAction.js'
import Book from '../Library/Book.jsx';
import generic from '../../assets/images/generic.jpg'

class Allbooks extends Component {
	constructor(props) {
    super(props);
    this.state = {
      books: {},
    }
	}
	componentWillMount() {
		this.props.getBooks();
	}
	render() {
		return (
			<div className='row'>
				{this.props.books.map((book) => {
					return (
						<div key={book.id}>
							<Book image={generic} title={book.title} author={book.author} category={book.category}
								description={book.description} status={book.status} id={book.id} />
						</div>
					)
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		books: state.bookReducer.books
	};
}

export default connect(mapStateToProps, {
	getBooks,
})(Allbooks);
