import React from 'react';

/** @description shows pagination component
   * 
   * @param { object } props 
   * 
   * @returns { JSX } JSX
   */
const Pagination = props => (
  <div className="enter">
    <ul className='pagination'>
      <li
        className={props.currentPage === 1 &&
          'disabled'
        }
        disabled={props.currentPage === 1}
      >
        <a id="previous" onClick={event =>
          props.previousPage(event, props.currentPage)}>
          <i className='material-icons link-cursor'>
            chevron_left</i></a></li>
      {props.pages.map(page => (
        <li key={page}
          className={page === props.currentPage &&
            'active'
          }>
          <a id={`new${page}`}
            className="link-cursor"
            onClick={event => props.newPage(event, page)}>
            {page}</a>
        </li>
      )
      )}
      <li
        className={props.currentPage === props.totalPages &&
          'disabled'
        }
        disabled={props.currentPage === props.totalPages}
      >
        <a id="next"
          className="link-cursor"
          onClick={event => props.nextPage(event, props.currentPage)}>
          <i className="material-icons">
            chevron_right</i></a></li>
    </ul>
  </div>
);

export default Pagination;
