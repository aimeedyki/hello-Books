import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';
import Library from '../Library/Library';
import History from '../History/History';
import Outstanding from '../Outstanding/Outstanding';
import Profile from '../Profile/Profile'
import ChangePassword from '../ChangePassword/ChangePassword';
import Editprofile from '../Editprofile/Editprofile';
import Addbook from '../Addbook/Addbook';
import Notification from '../Notification/Notification'

export default class User extends Component{
    render(){
        return (
          <div>
            <Topnav levelicon='images/rookie.jpg'/>  
            <Sidenav  profilepic='images/profilephoto.jpg' firstname='Grace' lastname='Joel' email='gracejoel@gmail.com'/>
            <Library/>
          </div>    
        );
    }
}