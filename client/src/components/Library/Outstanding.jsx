import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {returnBook} from '../../actions/bookAction.js';
import { getOutstanding, displayUserpage } from '../../actions/userAction.js';
import Table from '../Common/Table.jsx';

class Outstanding extends Component {
  constructor(props) {
    super(props);
    this.data = [],
      this.state = {
        histories: [],
        userId: ''
      }
    this.return = this.return.bind(this);  
  }

  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getOutstanding(userId);
    
  }
  return(id, userId){
    const shouldReturn = confirm("Are you sure you want to Return this book");
    if (shouldReturn === true) {
      this.props.returnBook(id, userId);
    }
    
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { userId } = this.props.user;
      
      this.data = nextProps.notReturned.map((notReturnedItem) => {
        let bookTitle = notReturnedItem.book.title;
        let borrowed = moment(notReturnedItem.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        let expected = moment(notReturnedItem.expectedDate).format('MMMM Do YYYY, h:mm:ss a');
        let bookId = notReturnedItem.bookId
        
        return ({
          title: bookTitle,
          borrowdate: borrowed,
          due: expected,
          return: <a onClick={() => {this.return(bookId, userId )}}>RETURN</a> 
        })
      });
    }
  }
  render() {
    const header = [
      {
        name: "TITLE",
        prop: "title"
      },
      {
        name: "DATE BORROWED",
        prop: "borrowdate"
      },
      {
        name: 'DUE DATE',
        prop: "due"
      },
      {
        name: "RETURN NOW?",
        prop: "return"
      }
    ];
    return (
      <div className="row">
        <div className="col s12 l8 offset-l3">
          <Table data={this.data} header={header} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;

  return {
    notReturned: state.userReducer.notReturned,
    user
  };
}

export default connect(mapStateToProps, {
  getOutstanding, displayUserpage, returnBook
})(Outstanding);
