import React, { Component } from 'react';
import image from './reading.jpg';
import './Home.css';
import Tab from '../Tab/Tab';
import Input from '../Input/Input';
import Button from '../Button/Button';


class Signup extends Component{
render(){
  return(
    <div className="row">
    <form className="col s12">
      <div className="row">
        <Input name="firstname" type="text" label = "First Name"/>
        <Input name="lastname" type="text" label = "Last Name"/>
      </div>
      <div className="row">
        <Input name="email" type="text" label = "Email"/>  
        <Input name="username" type="text" label = "Username"/>
      </div>
      <div className="row">
        <Input name="password" type="text" label = "Password"/>   
        <Input name="confirmpassword" type="text" label = "Confirm Password"/>
      </div>
      <div className="row">
        <div className="input-field col s12 m6">
          <select className="icons">
            <option value="" disabled selected>Select</option>
            <option value="rookie" data-icon="images/rookie.jpg" className="left circle">Rookie</option>
            <option value="bookworm" data-icon="images/bookworm.png" className="left circle">Bookworm  N2000/month</option>
            <option value="voracious" data-icon="images/voracious.jpg" className="left circle">Voracious  N5000/month</option>
            <option value="admin" data-icon="images/admin.jpg" className="left circle">Admin</option>
          </select>
          <label>Membership Level</label>
        </div>
        <p>
          <Input name="check" type="checkbox" label = "By checking this box, you agree to our Terms & Conditions"/>   
        </p>
      </div> 
      <div className="row">
        <div className="col s4">
        <Button type="submit" name="action" label="Submit" icon="send"/>
        </div>
        <div className="col s2">
          <p>Or signup with:</p>
        </div>
        <div className="col s6">                 
          <Button type="submit" name="action" label="google plus"><i className="fa fa-google-plus"></i></Button>
        </div>  
      </div>       
    </form>
  </div>
  );
}
}
class Login extends Component{
render(){
  return(
    <div id="row">
    <form className="col s12 " action = "/" method = "post">
      <div className="row">
        <div className="col s12 offset-s3">  
          <Input name="username" type="text" label = "Username"/>  
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-s3">   
          <Input className="offset-s3" name="password" type="text" label = "Password"/>   
        </div>  
      </div>
      <div className="row">
        <div className="col s3 offset-s3">  
          <Button type="submit" name="action" label="Login" icon="send"/> 
        </div>
      </div>
      <div className="row">
        <div className="col s2 offset-s3">
          <p>Or login with:</p>
        </div>
      </div>
      <div className="row">  
        <div className="col s6 offset-s3">                 
          <Button type="submit" name="action" label="google plus"><i className="fa fa-google-plus"></i></Button>
        </div>  
      </div>
    </form>
  </div>
  );
}
}

export default class Home extends Component {
  render() {
    const data = [{content:Signup, id:'signup', idLink:'#signup', title:'SIGN UP'},
    {content:Login, id:'login', idLink:'#login', title:'LOGIN'}];
    return (
      <div>
        <nav className="purple">
          <div className="navWide">  
					  <div className="wideDiv right">
					  	<a href="#">About us</a>
				  	</div>
				    <div className="row">
              <div className="col s12 App-header purple-text center">
                <h2>BOOKSVILLE</h2>
              </div>
            </div>
          </div>
        </nav>  
        <div className="row">
          <img src={image} className="col s12" alt="logo" />
        </div>
        <Tab data={data}/>
      </div> 
    );
  }
}



