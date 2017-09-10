import React, { Component } from 'react';
import Button from '../Button/Button';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card small col s6 m3 l3">
        <div className="card-image book-image waves-effect waves-block waves-light">
          <img className="activator responsive-img" src={this.props.image} alt='book image' />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4"><i className="material-icons left">more_vert</i>{this.props.title}</span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
          <h5>By {this.props.author}</h5>
          <h6>{this.props.category}</h6>
          <p>{this.props.description}</p>
          <p>{this.props.status}</p>
          <div className="fixed-action-btn">
            <a className="btn-floating btn-large indigo darken-2">RENT</a>
            <ul>
              <li><a href="#editbook" className=" modal-trigger btn-floating indigo darken-2"><i className="material-icons">edit</i></a></li>
              <li><a className="btn-floating indigo darken-2"><i className="material-icons">delete</i></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
