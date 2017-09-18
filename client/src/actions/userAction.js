import axios from 'axios';
import {
  GET_USER,
} from './types';

export const displayUserpage = () =>{
  let user = {}
  
  user = localStorage.getItem('user');
  return(dispatch)=>{
  dispatch({ type: GET_USER,
      payload: JSON.parse(user)
     })
    }
  
}
