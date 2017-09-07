import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default class ChangePassword extends Component{
    render(){
      return(
        <div className="row">
          <div  className='card col s10 m8 l6 offset-s1 offset-m2 offset-l3'> 
            <form>
              <div className='row'>
                <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l3'> 
                <Input name="oldpassword" type="text" label = "Password"/>  
                      
              <Input name="newpassword" type="text" label = "New password"/>   
              
              <Input name="cnewpassword" type="text" label = "Confirm new password"/>   
            
              <Button type="submit" name="action" label="Change Password" icon="send"/> 
              </div>
              </div>
        </form>
        </div>
      </div>
      );
    }
    }