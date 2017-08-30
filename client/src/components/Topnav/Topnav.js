import React, { Component } from 'react';
import './Topnav.css';

export default class Topnav extends Component{
    render () {
      return (
        <div className="navbar-fixed purple">
        <nav>
            <div className="nav-wrapper purple">
              <a href="#!" className="brand-logo left book">BOOKSVILLE</a>
                <ul className="right">
                  <li><a href="#">Log out</a></li>
                </ul>
            </div>
        </nav>
    </div>
      );
    }
  }