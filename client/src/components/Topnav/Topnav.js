import React, { Component } from 'react';


export default class Topnav extends Component {
  render() {
    return (
      <div className='row'>
        <div className="col s12 navbar-fixed white">
          <nav>
            <div className="nav-wrapper white">
              <a href="#!" className="brand-logo left col l3 offset-l2 indigo-text text-darken-2">BOOKSVILLE</a>
              <ul className="right">
                <li>
                  <div className="row valign-wrapper">
                    <div className='col s4 m5 l5'>
                      <img className='circle level-icon responsive-img' src={this.props.levelicon} />
                    </div>
                  </div>
                </li>
                <li><a href="#" className="indigo-text text-darken-2">Log out</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
