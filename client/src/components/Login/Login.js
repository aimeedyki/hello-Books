import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';  
import { loginUser } from '../../actions';


export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          password: '',
          cpassword:'',
          fireRedirect:false
        }
    
        this.submitHandler = this.submitHandler.bind(this)
        this.handleInput = this.handleInput.bind(this)
      }
    
      handleInput(event) {
        const target = event.target
        this.setState({
          [target.name]: target.value
        })
      }  
    
      submitHandler(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
      }
    render(){
      const { fireRedirect } = this.state

      return(
        <div className="row">
          <div className='col s12 m10 l6 offset-m1 offset-l3'>
            <div className='card front row'>
              <div className='col s10 m10 l8 offset-m1 offset-s1 offset-l2'>
                <h5 className='center greeting'>Welcome back! Login to continue</h5>
              <form onSubmit={this.submitHandler}>
                <div className="row">
                  <div className="input-field col s12">  
                    <Input name="username" type="text" label = "Username"/>  
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">   
                    <Input className="offset-s3" name="password" type="text" label = "Password"/>   
                  </div>  
                </div>
                <div className="row">
                  <div className="input-field col s12">  
                    <Button type="submit" name="action" label="Login" icon="send"/>
                      
                  </div>
                </div>
              </form>
              {fireRedirect && (
                <Redirect to={'/user'}/>
              )}
              <div className="row">
                  <div className="col s12">
                    <p>Or login with:</p>
                  </div>
                </div>
                <div className="row">  
                  <div className="col s12">                 
                    <Button type="submit" name="action" label="Google plus"><i className="fa fa-google-plus"></i></Button>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }