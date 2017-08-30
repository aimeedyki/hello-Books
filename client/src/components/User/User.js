import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';

export default class User extends Component{
    render(){
        return (
          <div>
            <Topnav/>  
            <Sidenav  profilepic='images/profilephoto.jpg' firstname='Grace' lastname='Joel' email='gracejoel@gmail.com'/>
          </div>    
        );
    }
}