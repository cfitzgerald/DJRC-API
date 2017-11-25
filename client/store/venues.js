import axios from 'axios';
import { setError } from './error';

// ACTION TYPE(s)
const GET_VENUES = 'GET_VENUES';

// ACTION CREATOR(s)
export function getVenues(venues) {
  return { type: GET_VENUES, venues };
}

// THUNK CREATOR(s)
export function fetchVenues() {
  return (dispatch) => {
    return axios.get('/api/venues')
      .then(res => res.data)
      .then(venues => {
        dispatch(getVenues(venues));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function updateOwner (venueId, userId) {
    return axios.put(`/api/venues/${venueId}`,  { userId } )
    .then(res => res.data)
    // .then(() => dispatch(fetchVenues()))
}

export function getOwner(userId){
  return axios.put(`/api/venues/owner/${userId}`)
  .then(res => res.data)
}

export function deleteVenue(id) {
  return (dispatch) => {
    return axios.delete(`api/venues/${id}`)
    .then(() => {
      dispatch(fetchVenues());
    });
  };
}

// export function updateVenue(venue, history) {
//   return (dispatch) => {
//     return axios.put(`api/user/${venue.id}`, venue)
//     .then(() => {
//       dispatch(fetchVenues());
//     });
//   };
// }

// REDUCER(s)
export default function reducer(state = [], action) {
  switch (action.type){
    case GET_VENUES:
      return action.venues;
    default:
      return state;
  }
}
