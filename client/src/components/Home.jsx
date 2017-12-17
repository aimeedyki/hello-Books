import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Button from './Common/Button';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import NotFound from './NotFound';
import Footer from './Common/Footer';
import About from './About';

const imageUrl = 'https://res.cloudinary.com/ddxsazo2k/image/upload/';

// landing page
const Home = props => (
  <div className="background-set">
    <div className="background-set">
      {/* navbar for home page */}
      <div className="row logo">
        <div className="col s12 navbar white">
          <nav role="navigation" className="home">
            <div className="nav-wrapper white">
              <Link to="/" id="logo-container"
                className="brand-logo booksville indigo-text text-darken-2"><h4>
                  <b>Booksville</b></h4></Link>
              <ul className="right">
                <li><Link to="/about" className="indigo-text text-darken-2">
                  About us</Link></li>
                <li><Link to="/api-docs" className="indigo-text text-darken-2">
                  API DOCS</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="background-set">
        <div className="row white-text">
          <img
            src={`${imageUrl}/v1509441751/girl_ckyyla.png`}
            className="col l4 m4 offset-m1 offset-l1 hide-on-small-only"
            id="pic" alt="BOOKSVILLE" />

          {/* routing for the signup login and about pages */}
          <div className="col s12 l6 m6 offset-m1 offset-l1">
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>


);

export default Home;
