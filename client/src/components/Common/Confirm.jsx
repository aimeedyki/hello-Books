/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

// button component ensures buttons are uniform
const Confirm = props => (
  <div>
    <a className={`modal-trigger ${props.addedClassName}`}
      href="#modal1">{props.trigger}</a>
    <div id="modal1" className="modal bottom-sheet">
      <div className="modal-content">
        <h4>{props.header}</h4>
        <p>{props.message}</p>
      </div>
      <div className="modal-footer">
        <a className="modal-action modal-close btn-flat"
          onClick={() => props.onClick()}>
          {props.action}</a>
        <a className="modal-action modal-close btn-flat">
          Cancel
        </a>
      </div>
    </div>
  </div>
);

export default Confirm;
