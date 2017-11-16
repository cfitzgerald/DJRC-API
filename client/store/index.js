import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger

import authUser from './auth';
import error from './error';
// import genres from './genres';
// import promos from './promos';
import users from './users';
import venues from './venues';

const rootReducer = combineReducers({
  authUser,
  error,
  // genres,
  // promos,
  users,
  venues,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export * from './auth';
export * from './error';
// export * from './genres';
// export * from './promos';
export * from './users';
export * from './venues';
