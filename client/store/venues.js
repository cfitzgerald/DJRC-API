import axios from 'axios';
import { setError } from './error';

// ACTION TYPE(s)
const GET_VENUES = 'GET_VENUES';
const GET_VENUE_COUNT = 'GET_VENUE_COUNT';

// ACTION CREATOR(s)
export function getVenues(venues) {
  return { type: GET_VENUES, venues };
}

export function getVenueCount(venueCount) {
  return { type: GET_VENUE_COUNT, venueCount };
}

// THUNK CREATOR(s)
export function fetchVenues() {
  return (dispatch) => {
    return axios.get('/api/venues')
      .then(result => result.data.rows) // append .rows for findAndCountAll()
      .then(venues => {
        dispatch(getVenues(venues));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function fetchVenueCount() {
  return (dispatch) => {
    return axios.get('/api/venues')
      .then(result => result.data.count) // append .count for findAndCountAll()
      .then(count => {
        dispatch(getVenueCount(count));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function updateOwner (venueId, userId) {
    return axios.put(`/api/venues/${venueId}`,  { userId } )
    .then(res => res.data)
    // .then(() => dispatch(fetchVenues()))
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
    case GET_VENUE_COUNT:
      return action.venueCount;
    default:
      return state;
  }
}
