import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import moment from 'moment';
import alert from 'sweetalert';

import { returnBook } from '../../actions/bookAction';
import { getOutstanding } from '../../actions/userAction';
import Table from '../Common/Table.jsx'; // eslint-disable-line no-unused-vars
/** displays books not returned
 * @class Outstanding
 * @extends {Component}
 */
class Outstanding extends Component {
  /** Creates an instance of Outstanding.
     * @param {any} props
     * @memberof Outstanding
     */
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      histories: [],
      userId: ''
    };
    this.return = this.return.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  /** fetches outstanding books
   * @memberof Outstanding
   * @returns {object} outstanding books
   */
  componentDidMount() {
    const { userId } = this.props.user;
    this.props.getOutstanding(userId);
  }

  /** @description refreshes book page
   * @returns {*} void
   * @memberof Book
   */
  refresh() {
    this.props.getOutstanding(this.props.user.userId);
  }
  /** returns a book
   * @param {any} id
   * @param {any} userId
   * @memberof Outstanding
   * @returns {*} void
   */
  return(id, userId) {
    alert({
      title: 'Return this book?',
      text: 'Are you sure that you want to return this book?',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willReturn) => {
        if (willReturn) {
          this.props.returnBook(id, userId, this.refresh);
          alert('Returned!', 'Book has been Returned!', 'success');
        }
      });
  }
  /** sets an array of books fetched when available
   * @param {any} nextProps
   * @memberof Outstanding
   * @returns {object} outstanding books
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { userId } = this.props.user;
      this.data = nextProps.notReturned.map((notReturnedItem) => {
        const bookTitle = notReturnedItem.book.title;
        const borrowed = moment(
          notReturnedItem.createdAt).format('MMMM Do YYYY');
        const expected = moment(
          notReturnedItem.expectedDate).format('MMMM Do YYYY');
        const historyId = notReturnedItem.id;
        return ({
          title: bookTitle,
          borrowdate: borrowed,
          due: expected,
          return: <a className='link-cursor'
            onClick={() => { this.return(historyId, userId); }}>RETURN</a>
        });
      });
    }
  }
  /** renders outstanding books table
   * @returns {*} component
   * @memberof Outstanding
   */
  render() {
    const header = [
      {
        name: 'TITLE',
        prop: 'title'
      },
      {
        name: 'DATE BORROWED',
        prop: 'borrowdate'
      },
      {
        name: 'DUE DATE',
        prop: 'due'
      },
      {
        name: 'RETURN NOW?',
        prop: 'return'
      }
    ];
    return (
      <div className='row'>
        <div className='card col s12 l8 offset-l3'>
          <Table data={this.data} header={header} />
        </div>
      </div>
    );
  }
}
// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    notReturned: state.userReducer.notReturned,
    user
  };
};
export default connect(mapStateToProps, {
  getOutstanding, returnBook
})(Outstanding);
