import React, { Component } from 'react';

export default class Sidenav extends Component{
    render(){
      return (
        <div>
          <ul id="slide-out" className="side-nav fixed">
            <li>
              <div className="user-view">
                <div className="background">
                  <img src="images/booksbw2.jpg" alt="background"/>
                </div>
                <a href="#!user"><img className="circle" src={this.props.profilepic} alt="profile photo"/></a>
                <a href="#!name"><span className="white-text name">{this.props.firstname} {this.props.lastname}</span></a>
                <a href="#!email"><span className="white-text email">{this.props.email}</span></a>
              </div>
            </li>
            <li><a href="#!">LIBRARY</a></li>
            <li><a href="#!">HISTORY</a></li>
            <li><a href="">OUTSTANDING</a></li>
            <li><a href="">PROFILE SETTINGS</a></li>
            <li><a href=''>ADD BOOK</a></li>
            <li><a href=''>MODIFY BOOK</a></li>
            <li><a href=''>NOTIFICATIONS</a></li>
          </ul>
          <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
        );
    }
}