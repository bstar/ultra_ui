import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import player from './player';

const reducers = {
  routing: routerReducer,
  settings,
  player,
};

export default combineReducers(reducers);
