import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {deleteBook, borrowBook, displayUserpage} from '../../actions/bookAction.js'
import Button from '../Common/Button.jsx';

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.borrow = this.borrow.bind(this);
  }

  componentDidMount() {
    const {userId} = this.props;
    this.setState({
      userId
    });
  }
 
  handleClick(id){
    const shouldDelete = confirm("Are you sure you want to delete this book");
    if (shouldDelete === true) {
        this.props.deleteBook(id)
    }
  }
  borrow(id, userId){
    this.props.borrowBook(id, userId);
  }
  render() {
    const editPath=`/user/edit-book/${this.props.id}`;
    const { userId } = this.props.user;
    let status;
   
    (this.props.quantity > 1 ) ? status = `${this.props.quantity} COPIES AVAILABLE` : status= 'UNAVAILABLE';
    return (
      <div className="card small col s6 m3 l3">
        <div className="card-image book-image waves-effect waves-block waves-light">
          <img className="activator responsive-img" src={this.props.image} alt='book image' />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4"><i className="material-icons left">more_vert</i>{this.props.title}</span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
          <h5>By {this.props.author}</h5>
          <h6>{this.props.category}</h6>
          <p>{this.props.description}</p>
          <p>{status}</p>
          <div className="fixed-action-btn">
            <a onClick={() => {this.borrow(this.props.id, userId )}}className="btn-floating btn-large indigo darken-2">RENT</a>
            <ul>
              <li><Link to={editPath} className="btn-floating indigo darken-2"><i className="material-icons">edit</i></Link></li>
              <li><a onClick={() => {this.handleClick(this.props.id)}} className="btn-floating indigo darken-2"><i className="material-icons">delete</i></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;
  return {
    user
  };
}

export default connect(mapStateToProps, {
	deleteBook, borrowBook, displayUserpage
})(Book);
