import React, { Component } from 'react';
import { Link, Switch, Route} from 'react-router-dom';


import Tab from './Common/Tab.jsx';
import Input from './Common/Input.jsx';
import Button from './Common/Button.jsx';
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import homeImage from '../assets/images/girl.png'


export default class Home extends Component {
  render() {
    
    return (
      <div className='row background-set'>
        <div className="col s12 navbar-fixed white indigo-darken-2-text">
          <nav>
            <div className="nav-wrapper white">
              <a className="brand-logo indigo-text text-darken-2'">BOOKSVILLE</a>
              <ul className="right ">
                <li><a className='indigo-text text-darken-2'>About us</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row white-text">
          <img src={homeImage} className=" col l4 m4 offset-m1 offset-l1 hide-on-small-only" id="pic" alt="BOOKSVILLE" />
          <div className="col s12 l6 m6 offset-m1 offset-l1">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
