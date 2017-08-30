import React, { Component } from 'react';

export default class Input extends Component{
    render () {
        return (
            <div className="input-field col s6">
                <input 
                    id={this.props.name}
                    required
                    type={this.props.type}
                    className="validate"
                />  
                <label for={this.props.name}>{this.props.label}</label>
            </div>
        );
    }
  }
  