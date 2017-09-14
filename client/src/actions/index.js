import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  STORE_USER
} from './types';

const API_URL = 'http://localhost:5000/api/v1';

export function clearErrorMessage() {
  return {
    type: CLEAR_ERROR
  };
}

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';
  
    if(error.data.error) {
      errorMessage = error.data.error;
    } else if(error.data){
      errorMessage = error.data;
    } else {
      errorMessage = error;
    }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'Oops! you have strayed far from home... Please login to enjoy the Booksville experience.'
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}



export function signupUser({ email, username, password, level }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/signup`, { email, username, password, level })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        Materialize.toast('Signup successful! Welcome to Booksville', 7000)
        dispatch({ type: AUTH_USER });
        dispatch({type:STORE_USER});
        
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  }
}

export function signinUser({ username, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/users/signin`, { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      Materialize.toast('Welcome back to Booksville!!', 7000)
      dispatch({type:STORE_USER});
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

