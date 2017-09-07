import React, { Component } from 'react';
import Topnav from '../Topnav/Topnav';
import Sidenav from '../Sidenav/Sidenav';
import Library from '../Library/Library';
import Borrowed from '../Borrowed/Borrowed';
import Outstanding from '../Outstanding/Outstanding';
import Profile from '../Profile/Profile'
import ChangePassword from '../ChangePassword/ChangePassword';
import Editprofile from '../Editprofile/Editprofile';
import Addbook from '../Addbook/Addbook';
import Useractivity from '../Useractivity/Useractivity';
import {Route, Switch} from 'react-router-dom';

export default class Userpage extends Component{
  constructor(props) {
    super(props);
  }
    render(){
        return (
          <div>
            <Topnav levelicon='images/rookie.jpg'/>  
            <Sidenav  profilepic='images/profilephoto.jpg' firstname='Grace' lastname='Joel' email='gracejoel@gmail.com'/>
            <div> 
              <Switch>
                <Route path = {"/user/notreturned"} render={() => <Outstanding />}/>
                <Route path = {"/user/new"} component = {Addbook} /> 
                <Route path = {"/user/password"} component = {ChangePassword} />
                <Route path = {"/user/profile"} component = {Editprofile} />
                <Route path = {"/user/history"} component = {Borrowed} />
                <Route exact path = {'/user/library'} render={() => <Library/>}/>
                <Route path = {"/user/notifications"} component = {Useractivity} />
              </Switch>
            </div>
          </div>    
        );
    }
}