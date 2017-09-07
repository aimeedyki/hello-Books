import React, { Component } from 'react';
import Table from '../Table/Table';

export default class Outstanding extends Component{
    render(){
        const data=[{title:"the beautiful", borrowdate:'17/8/2017', return: <a>RETURN</a>},
        {title:"the bad", borrowdate:'31/7/2017', return: <a>RETURN</a>}];
        const header=[
          {
            name: "TITLE",
            prop: "title"
          },
          {
            name: "DATE BORROWED",
            prop: "borrowdate"
          },
          {
            name: "RETURN NOW?",
            prop: "return"
          }
        ]; 
      return(
        <div className="row">
          <div className="col s12 l8 offset-l2">
            <Table data={data} header={header}/>
          </div>
        </div>  
      );
    }
}