import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './Tab.css';



export default class Tab extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="row indigo-text text-darken-2'">
        <div className="col s12">
          <ul className="tabs center">
            {this.props.data.map((tab) => {
              return (
                <li className="tab" key={tab.id}><a href={tab.idLink}>{tab.title}</a></li>)
            })}
          </ul>
        </div>
        <div className="col s12">
          {this.props.data.map(tab => {
            return (
              <div key={tab.id} id={tab.id}>
                <tab.content />
              </div>
            )
          })}
        </div>
      </div>


    );
  }
}
