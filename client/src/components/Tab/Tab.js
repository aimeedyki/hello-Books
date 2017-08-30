import React, { Component } from 'react';
import './Tab.css';

export default class Tab extends Component{
  render(){
    return(
    <div className="container">  
      <div className="row purple-text">
        <div className="col s12">
          <ul className="tabs">
          {this.props.data.map(function (tab) {
            return (
              <li className="col s3" key={tab.id}><a href={tab.idLink}>{tab.title}</a></li>)})}
          </ul>
        </div>
        <div className="col s12">
          {this.props.data.map(tab => {
            return(
              <div key={tab.id} id={tab.id}>
                <tab.content/>
              </div>  
            )
          })}
        </div>
      </div>
    </div>  
    
    );
  }
}