import React from 'react'; // eslint-disable-line no-unused-vars

// button component ensures buttons are uniform
const Button = props => (
  <div>
    <button className="btn waves-effect waves-light indigo darken-2"
      type={props.type}
      name={props.name}>{props.label}
      <i className="material-icons right">{props.icon}</i>
    </button>
  </div>
);


export default Button;

