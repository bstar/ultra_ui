import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import player from './player';
import attribute from './attribute';
import list from './list';

const reducers = {
  routing: routerReducer,
  settings,
  player,
  attribute,
  list,
};

export default combineReducers(reducers);
