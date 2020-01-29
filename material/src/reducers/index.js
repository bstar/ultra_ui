import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import player from './player';
import attribute from './attribute';

const reducers = {
  routing: routerReducer,
  settings,
  player,
  attribute,
};

export default combineReducers(reducers);
