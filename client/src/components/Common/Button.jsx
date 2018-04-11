import React from 'react';

/** @description button component ensures buttons are uniform
   *
   * @param { object } props
   * 
   * @returns { JSX } JSX
   */
const Button = props => (
  <div>
    <button className="btn indigo darken-2"
      type={props.type}
      name={props.name}>{props.label}
      <i className="material-icons right">{props.icon}</i>
    </button>
  </div>
);


export default Button;

