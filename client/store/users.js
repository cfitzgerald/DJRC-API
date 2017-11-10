import axios from 'axios';
import { setError } from './error';

// ACTION TYPE(s)
const GET_USERS = 'GET_USERS';

// ACTION CREATOR(s)
export function getUsers(users){
  return { type: GET_USERS, users };
}

// THUNK CREATOR(s)
export function fetchUsers(){
  return (dispatch) => {
    return axios.get('/api/user')
      .then(result => result.data)
      .then(users => {
        dispatch(getUsers(users));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function deleteUser(id){
  return (dispatch) => {
    return axios.delete(`api/user/${id}`)
    .then(() => {
      dispatch(fetchUsers());
    });
  };
}

export function updateUser(user, history){
  return (dispatch) => {
    return axios.put(`api/user/${user.id}`, user)
    .then(() => {
      if (user.currentPassword){
        history.push('/');
      dispatch(fetchUsers());
      }
    });
  };
}

export function resetPassword(id){
  return (dispatch) => {
    return axios.put(`api/user/${id}`, { passwordExpired: true })
    .then( () => {
      dispatch(fetchUsers());
    });
  };
}

// REDUCER(s)
export default function reducer(state = [], action){
  switch (action.type){
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
