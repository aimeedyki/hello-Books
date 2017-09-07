import React, { Component } from 'react';
import './Card.css';
import Button from '../Button/Button';

export default class Card extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="card center large">
        <div>
        <img src={this.props.image} alt='book image'/>
        </div>
        <span className="card-title">{this.props.title}</span>  
        <h6>{this.props.author}</h6>
        <p>{this.props.category}</p>
        <p>{this.props.description}</p>
        <p>{this.props.status}</p>
        <a className="btn-floating btn-large waves-effect waves-light purple">rent</a>
        <a className="btn-floating btn-large waves-effect waves-light purple"><i className="material-icons">edit</i></a>
        <a className="btn-floating btn-large waves-effect waves-light purple"><i className="material-icons">delete</i></a>
      </div>
);
}
}