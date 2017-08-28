import React, { Component } from 'react';
import './Tab.css';

class Input extends Component{
    render () {
        return (
            <div className="input-field col s6">
                <input 
                    id={this.props.name}
                    required
                    type={this.props.type}
                    className="validate"
                />  
                <label for={this.props.name}>{this.props.label}</label>
            </div>
        );
    }
}

class Button extends Component{
  render (){
    return(
      <button className="btn waves-effect waves-light purple" 
        type={this.props.type} 
        name={this.props.name}>{this.props.label}
        <i className="material-icons right">{this.props.icon}</i>
      </button>
    );
  }
}
export default class Tab extends Component{
  render(){
    return(
    <div className="container">  
      <div className="row purple-text">
        <div className="col s12">
          <ul className="tabs tabs-fixed-width">
            <li className="tab col s6"><a href="#signup">SIGN UP</a></li>
            <li className="tab col s6"><a className="active" href="#login">LOGIN</a></li>
          </ul>
        </div>
        <div id="signup" className="col s12">
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
        </div>
        <div id="login" className="col s12">
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
        </div>
      </div>
    </div>  
    
    );
  }
}