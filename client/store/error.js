// ACTION TYPE(s)
const SET_ERROR = 'SET_ERROR';

// ACTION CREATOR(s)
export function setError(msg) {
    return {
        type: SET_ERROR,
        msg
    };
}

// REDUCER(s)
export default function reducer(state = '', action) {
    switch (action.type) {
        case SET_ERROR:
            return action.msg;
        default:
            return state;
    }
}
