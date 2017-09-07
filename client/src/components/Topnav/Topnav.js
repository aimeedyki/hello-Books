import React, { Component } from 'react';
import './Topnav.css';

export default class Topnav extends Component{
    render () {
      return (
        <div className='row'>
          <div className="col s12 navbar-fixed purple">
          <nav>
            <div className="nav-wrapper purple">
              <a href="#!" className="brand-logo left book">BOOKSVILLE</a>
                <ul className="right">
                  <li>
                    <div className="row valign-wrapper">
                      <div className='col s4 m4 l4'>  
                        <img className='circle responsive-img' src={this.props.levelicon}/>
                      </div>
                    </div>
                  </li>
                  <li><a href="#">Log out</a></li>
                </ul>
            </div>
          </nav>
          </div>
    </div>
      );
    }
  }