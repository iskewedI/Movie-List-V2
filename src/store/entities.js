import { combineReducers } from 'redux';
import moviesReducer from './movies';
import toSeeReducer from './toSee';
import userReducer from './user';

export default combineReducers({
  movies: moviesReducer,
  toSee: toSeeReducer,
  user: userReducer,
});
