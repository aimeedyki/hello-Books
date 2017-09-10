import React, { Component } from 'react';

export default class Input extends Component {
    render() {
        return (
            <div className="input-field">
                <input
                    id={this.props.name}
                    required
                    type={this.props.type}
                    className="validate"
                />
                <label>{this.props.label}</label>
            </div>
        );
    }
}
