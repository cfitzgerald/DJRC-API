import axios from 'axios';
import { setError } from './error';
import { fetchUsers } from './users';

// ACTION TYPE(s)
const SET_USER = 'SET_USER';

// ACTION CREATOR(s)
export function setUser(user) {
    return {
        type: SET_USER,
        user
    };
}

// THUNK CREATOR(s)
export function loginUser(credentials, history) {
    return function thunk(dispatch) {
        return axios.post('/api/auth', credentials)
            .then(res => res.data)
            .then(user => {
                dispatch(setUser(user));
                if (history) {
                    user.passwordExpired === true ? history.push('/reset') : history.push('/');
                }
            })
            .catch(err => dispatch(setError(err.response.data)));
    };
}

export function logoutUser() {
    return function thunk(dispatch) {
        return axios.delete('/api/auth')
            .then(() => {
                dispatch(setUser({}));
            })
            .then(() => {
                history.push('/');
            })
            .catch(err => dispatch(setError(err.response.data)));
    };
}

export function createUser(credentials, history) {
    return function thunk(dispatch) {
        return axios.post('/api/user', credentials)
            .then(res => res.data)
            .then(() => {
                dispatch(fetchUsers());
                dispatch(loginUser(credentials, history));
            })
            .catch(err => dispatch(setError(err.response.data)));
    };
}

export function fetchUser() {
    return (dispatch) => {
        return axios.get('/api/auth')
            .then(result => result.data)
            .then(user => {
                dispatch(setUser(user));
            })
            .catch(err => dispatch(setError(err.response.data)));
    };
}

// REDUCER(s)
export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
}
