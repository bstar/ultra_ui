import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import player from './player';
import attribute from './attribute';
import list from './list';
import user from './user';

const reducers = {
  routing: routerReducer,
  settings,
  player,
  attribute,
  list,
  user,
};

export default combineReducers(reducers);
