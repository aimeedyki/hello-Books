import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default class Editprofile extends Component{
    render(){
      return(
        <div className="row">
          <div  className='card col s10 m8 l6 offset-s1 offset-m2 offset-l3'> 
            <form>
              <div className='row'>
                <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'> 
                  <Input name="firstname" type="text" label = "First name"/>  
                  <Input name="lastname" type="text" label = "Last name"/> 
                  <select className="icons">
                    <option value="" disabled selected>Change Membership Level</option>
                    <option value="rookie" data-icon="images/rookie.jpg" className="left circle">Rookie</option>
                    <option value="bookworm" data-icon="images/bookworm.png" className="left circle">Bookworm  N2000/month</option>
                    <option value="voracious" data-icon="images/voracious.jpg" className="left circle">Voracious  N5000/month</option>
                  </select>
                  <p className='grey-text'>Change profile picture</p>
                  <div className="file-field input-field">
                    <div className="btn purple">
                      <span>Browse</span>  
                      <input type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div> 
                  <Button type="submit" name="action" label="Change" icon="send"/> 
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
}