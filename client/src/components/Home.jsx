/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Button from './Common/Button.jsx';
import Login from './Authentication/Login.jsx';
import Signup from './Authentication/Signup.jsx';
import homeImage from '../assets/images/girl.png';


// landing page
const Home = props => (
  <div className='row background-set'>

    {/* navbar for home page */}
    <div className="row logo">
      <div className="col s12 navbar white">
        <nav role="navigation" className="home">
          <div className="nav-wrapper white">
            <a id="logo-container"
              className="brand-logo indigo-text text-darken-2">
              <b>Booksville</b></a>
            <ul className="right">
              <li><a className="indigo-text text-darken-2">About us</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div className="row white-text">
      <img src={homeImage}
        className="col l4 m4 offset-m1 offset-l1 hide-on-small-only"
        id="pic" alt="BOOKSVILLE" />

      {/* routing for the signup login and about pages */}
      <div className="col s12 l6 m6 offset-m1 offset-l1">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/about" component={About} /> */}
        </Switch>
      </div>
    </div>
  </div>

);

export default Home;
