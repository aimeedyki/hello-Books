import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'


import { getHistory, displayUserpage } from '../../actions/userAction.js'
import Table from '../Common/Table.jsx';

class Borrowed extends Component {

  constructor(props) {
    super(props);
    this.data = [],
      this.state = {
        histories: [],
        userId: ''
      }
  }
  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getHistory(userId);
    
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      
      this.data = nextProps.histories.map((history) => {
        let bookTitle = history.book.title;
        let borrowed = moment(history.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        
        let expected = moment(history.expectedDate).format('MMMM Do YYYY, h:mm:ss a');
        let returned;
        (history.returnedDate === null )? returned = 'Not returned' : returned  = moment(history.returnedDate).format('MMMM Do YYYY, h:mm:ss a');
       
        return ({
          title: bookTitle,
          borrowdate: borrowed,
          returndate: returned,
          due: expected
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
        name: "DATE RETURNED",
        prop: "returndate"
      },
      {
        name: 'DUE DATE',
        prop: "due"
      }
    ];
    return (
      <div className="row">

        <div key={this.props.histories.id} className="col s12 l8 offset-l3">
          <Table data={this.data}
            header={header} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.userReducer;

  return {
    histories: state.userReducer.histories,
    user
  };
}

export default connect(mapStateToProps, {
  getHistory, displayUserpage
})(Borrowed);
