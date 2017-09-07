import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button className="btn waves-effect waves-light deep-purple"
        type={this.props.type}
        name={this.props.name}>{this.props.label}
        <i className="material-icons right">{this.props.icon}</i>
      </button>
    );
  }
}
