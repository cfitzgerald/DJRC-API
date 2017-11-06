import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger

// import authUser from './auth';
// import genres from './genres';
// import promos from './promos';
// import users from './users';
// import venues from './users';

const rootReducer = combineReducers({
  // authUser,
  // genres,
  // promos,
  // users,
  // venues,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

// export * from './auth';
// export * from './genres';
// export * from './promos';
// export * from './users';
// export * from './venues';
