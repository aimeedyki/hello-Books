import React, { Component } from 'react';
import image from './reading.jpg';
import './Home.css';
import Tab from '../Tab/Tab';


export default class Home extends Component {
  render() {
    return (
      <div>
        <nav className="purple">
          <div className="navWide">  
					  <div className="wideDiv right">
					  	<a href="#">About us</a>
				  	</div>
				    <div className="row">
              <div className="col s12 App-header purple-text center">
                <h2>BOOKSVILLE</h2>
              </div>
            </div>
          </div>
        </nav>  
        <div className="row">
          <img src={image} className="col s12" alt="logo" />
        </div>
        <Tab/>
      </div> 
    );
  }
}



