import React from 'react';

const Pagination = props => (
  <div className='center'>
    <ul className='pagination'>
      <li
        className={props.currentPage === 1 &&
          'disabled'
        }
        disabled={props.currentPage === 1}
      >
        <a id="previous" onClick={event =>
          props.previousPage(event, props.currentPage)}>
          <i className='material-icons'>
            chevron_left</i></a></li>
      {props.pages.map(page => (
        <li key={page}
          className={page === props.currentPage &&
            'active'
          }>
          <a id={`new${page}`} onClick={event => props.newPage(event, page)}>
            {page}</a></li>
      )
      )}
      <li
        className={props.currentPage === props.totalPages &&
          'disabled'
        }
        disabled={props.currentPage === props.totalPages}
      >
        <a id="next" onClick={event =>
          props.nextPage(event, props.currentPage)}>
          <i className='material-icons'>
            chevron_right</i></a></li>
    </ul>
  </div>
);

export default Pagination;
