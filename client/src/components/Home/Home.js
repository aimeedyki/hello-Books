import React, { Component } from 'react';
import './Home.scss';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import homeImage from '../../assets/images/girl.png'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    const data = [{ content: Login, id: 'login', idLink: '#login', title: 'LOGIN' },
    { content: Signup, id: 'signup', idLink: '#signup', title: 'SIGN UP' }];
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
            <Tab data={data} />
          </div>
        </div>
      </div>
    );
  }
}
