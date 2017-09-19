import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getBooksByCategory} from '../../actions/bookAction.js'
import Book from '../Library/Book.jsx';
import generic from '../../assets/images/generic.jpg'

class Bookcategory extends Component {
	constructor(props) {
    super(props);
    this.state = {
      books: {},
    }
	}
	componentWillMount() {
		this.props.getBooksByCategory(this.props.categoryId);
	}
	render() {
    //if (this.props.books){}
		return (
			<div className='row'>
				{this.props.books.map((book) => {
					return (
						<div key={book.id}>
							<Book image={generic} title={book.title} author={book.author} category={book.category}
								description={book.description} status={book.status} id={book.id} quantity={book.quantity}/>
						</div>
					)
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		books: state.bookReducer.bookCategory.books
	};
}

export default connect(mapStateToProps, {
	getBooksByCategory,
})(Bookcategory);
