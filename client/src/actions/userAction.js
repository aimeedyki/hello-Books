import axios from 'axios';
import {
  GET_USER,
  GET_HISTORY,
  GET_OUTSTANDING,
  DISPLAY_NOTIFICATION,
  CHANGE_PASSWORD,
  CHANGE_LEVEL
} from './types';

const API_URL = 'http://localhost:5000/api/v1';
export const displayUserpage = () => {
  let user = {}

  user = localStorage.getItem('user');
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: JSON.parse(user)
    })
  }
}

export const getHistory = (userId) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/users/${userId}/books`)
      .then(response => {
        console.log('response is', response.data)
        dispatch({
          type: GET_HISTORY,
          payload: response.data.histories});
       })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      });
  }
}

export const getOutstanding = (userId) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/users/${userId}/books?returned=false`)
      .then(response => {
        
        dispatch({
          type: GET_OUTSTANDING,
          payload: response.data.histories});
       })
      .catch((error) => {
        errorHandler(dispatch, error.response, USER_ERROR);
      });
  }
}

export const displayNotification = (userId) => {
  return (dispatch) => {
    return axios.get(`${API_URL}/notifications`)
      .then(response => {
       
        dispatch({
          type: DISPLAY_NOTIFICATION,
          payload: response.data.notifications});
       })
      .catch((error) => {
        console.log(error)
      });
  }
}

export const passwordChange =(userId, oldPassword, newPassword) => {
  return (dispatch) => {
    return axios.put(`${API_URL}/users/${userId}`, {oldPassword, newPassword} )
      .then(response => {
        Materialize.toast('Password changed successfully!!', 4000)
        
        dispatch({
          type: CHANGE_PASSWORD,
        });
        return true;
       })
      .catch((error) => {
        console.log(error)
      });
  }
}

export const changeLevel =(userId, level ) => {
  return (dispatch) => {
    return axios.put(`${API_URL}/users/${userId}`, {level} )
      .then(response => {
        Materialize.toast('Level changed successfully!!', 4000)
        
        dispatch({
          type: CHANGE_LEVEL,
        });
        return true;
       })
      .catch((error) => {
        console.log(error)
      });
  }
}
