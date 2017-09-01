import React, { Component } from 'react';

export default class Profile extends Component{
  render(){
    return (
      <div className='row'>
        <div className='col s12 m6 offset-m3'>
          <div className='card grey'>
            <div className="center white-text">
              <img className="circle" src={this.props.profilepic} alt="profile photo"/>
              <h4>{this.props.username}</h4>
              <h5>{this.props.firstname} {this.props.lastname}</h5>
              <div className="row valign-wrapper">
                <div className='col s2 l2 offset-s3 offset-l4'>  
                  <img className='responsive-img' src={this.props.levelicon}/>
                </div>
                <h5>{this.props.level}</h5>
              </div>
              <p>{this.props.email}</p>
              <a>password change</a>
            </div>
            <a className="btn-floating btn-large waves-effect waves-light purple"><i className="material-icons">edit</i></a>
          </div>    
        </div>
      </div>    
    );
  }
}