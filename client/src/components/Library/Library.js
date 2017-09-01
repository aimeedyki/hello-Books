import React, { Component } from 'react';
import Tab from '../Tab/Tab';
import Card from '../Card/Card';

const books=[{title: 'the gods must be crazy' , image: 'images/davinci.jpg', author:'chinua achebe' , category:'THRILLER' , description:'A tales by moonlight' , status: 'Available'},
    {title:'Love yesterday now' , image:'images/dolphin.jpg' , author:'Joan Smith' , category:'ROMANCE' , description: 'A love story', status: 'Out of stock'},
    {title:'Mercy death sting' , image:'images/fiftysf.png' , author:'Grey Joy' , category:'THRILLER' , description:'Deadly tale' , status:'Available' },
    {title:'Romeo and Juliet' , image:'images/magicobt.jpg' , author:'Danny Cage' , category: 'ROMANCE', description: 'Love and death', status:'Available' },
    {title: 'Vampire diaries' , image:'images/whistler.png' , author:'Dan Brown' , category: 'THRILLER', description:'Vampire tale' , status:'Available' }];

    class Allbooks extends Component{
      constructor(props) {
            super(props);
       }   
        render(){
        return(
          <div className="row">
            
            {books.map((book) =>{ 
            return(
              <div className="col s12 m4 l3" key={book.title}>  
                <Card  image={book.image} title={book.title} author={book.author} category={book.category} 
                description={book.description} status={book.status} />
              </div>  
            )})}
          </div> 
        );
    }
}

class Thriller extends Component{
    render(){
        return(
            <h1>this is thriller category</h1>
        )
    }
}

class Romance extends Component{
    render(){
        return(
            <h1>this is romance category</h1>
        )
    }
}

export default class Library extends Component {
    render() {
        const data = [{content:Allbooks, id:'all', idLink:'#all', title:'ALL BOOKS'},
        {content:Thriller, id:'thriller', idLink:'#thriller', title:'THRILLER'},
        {content:Romance, id:'romance', idLink:'#romance', title:'ROMANCE'}];  
      return(
          <Tab data={data}/>
      );
      }
    }