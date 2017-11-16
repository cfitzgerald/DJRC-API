import axios from 'axios';
import { setError } from './error';

// ACTION TYPE(s)
const GET_VENUES = 'GET_VENUES';

// ACTION CREATOR(s)
export function getVenues(venues){
  return { type: GET_VENUES, venues };
}

// THUNK CREATOR(s)
export function fetchVenues(){
  return (dispatch) => {
    return axios.get('/api/venues')
      .then(result => result.data)
      .then(venues => {
        dispatch(getVenues(venues));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_VENUES:
      return action.venues;
    default:
      return state;
  }
}
