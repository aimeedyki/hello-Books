import React from 'react'; // eslint-disable-line no-unused-vars

const Pagination = props => (
  <div className='center'>
    <ul className='pagination'>
      <li
        className={props.currentPage === 1 &&
          'disabled'
        }
        disabled={props.currentPage === 1}
      >
        <a onClick={event =>
          props.previousPage(event, props.currentPage)}>
          <i className='material-icons'>
            chevron_left</i></a></li>
      {props.pages.map(page => (
        <li
          className={page === props.currentPage &&
            'active'
          }>
          <a onClick={event => props.newPage(event, page)}>
            {page}</a></li>
      )
      )}
      <li
        className={props.currentPage === props.totalPages &&
          'disabled'
        }
        disabled={props.currentPage === props.totalPages}
      >
        <a onClick={event =>
          props.nextPage(event, props.currentPage)}>
          <i className='material-icons'>
            chevron_right</i></a></li>
    </ul>
  </div>
);

export default Pagination;
