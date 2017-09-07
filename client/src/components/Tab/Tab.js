import React, { Component } from 'react';
import './Tab.css';



export default class Tab extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="row deep-purple-text">
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
