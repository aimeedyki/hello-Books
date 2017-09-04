import React, { Component } from 'react';
import image from './reading.jpg';
import './Home.css';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Login from '../Login/Login';
import {Link} from 'react-router-dom';


class Signup extends Component{
  render(){
    return(
      <div className="row">
        <div className='col s12 m10 l8 offset-m1 offset-l2'>
          <div className='card front'>
            <div className='row'>
              <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
              <h5 className='center greeting'>New User? Please fill your details and begin your journey with us!</h5>
            <form >
              <div className='row'>
                <div className="input-field col s6">
                  <Input  name="firstname" type="text" label = "First Name"/>
                </div>
                <div className="input-field col s6">  
                  <Input  name="lastname" type="text" label = "Last Name"/>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <Input className='col s6' name="email" type="text" label = "Email"/> 
                </div> 
                <div className="input-field col s6">
                  <Input className='col s6' name="username" type="text" label = "Username"/>
                </div>  
              </div>
              <div className="row">
                <div className="input-field col s6"> 
                  <Input className='col s6' name="password" type="text" label = "Password"/>   
                </div>  
                <div className="input-field col s6">  
                  <Input className='col s6' name="confirmpassword" type="text" label = "Confirm Password"/>
                </div>
              </div>  
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <select className="icons">
                    <option value="" disabled selected>Select</option>
                    <option value="rookie" data-icon="images/rookie.jpg" className="left circle">Rookie</option>
                    <option value="bookworm" data-icon="images/bookworm.png" className="left circle">Bookworm  N2000/month</option>
                    <option value="voracious" data-icon="images/voracious.jpg" className="left circle">Voracious  N5000/month</option>
                    <option value="admin" data-icon="images/admin.jpg" className="left circle">Admin</option>
                  </select>
                  <label>Membership Level</label>
                </div>
                <p className='col s12 m6 l6'>
                  <input type="checkbox" id="agreed" />
                  <label for="agreed">"By checking this box, you agree to our Terms & Conditions"</label>
                </p>
              </div> 
              <div className="row">
                <div className="col s12 m4 l4">
                  <Button type="submit" name="action" label="Signup" icon="send"/>
                </div>
              </div>
              <div className='row' >
                <div className="col s6 m4 l4">
                  <p>Or signup with:</p>
                </div>
                <div className="col s12 m4 l2">                 
                  <Button type="submit" name="action" label="Google plus"/>
                </div>  
              </div>       
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default class Home extends Component {
  render() {
    const data = [{content:Signup, id:'signup', idLink:'#signup', title:'SIGN UP'},
    {content:Login, id:'login', idLink:'#login', title:'LOGIN'}];
    return (
      <div className='row purple '>
        <div className="col s12 navbar-fixed white purple-text">
          <nav>
            <div className="nav-wrapper white">  
					    <a className="brand-logo left purple-text">BOOKSVILLE</a>
              <ul className="right purple-text">
                <li><a className='purple-text'>About us</a></li>
              </ul>  
				  	</div>
          </nav>
        </div>
        <div className="row">
          <img src={image} className="col s12" alt="logo" />
        </div>
      
          <Tab data={data}/>
        
      </div> 
    );
  }
}



