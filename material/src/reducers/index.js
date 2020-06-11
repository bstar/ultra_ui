import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import player from './player';
import attribute from './attribute';
import list from './list';
import user from './user';
import message from './message';
import modal from './modal';

const reducers = {
  routing: routerReducer,
  settings,
  player,
  attribute,
  list,
  user,
  message,
  modal,
};

export default combineReducers(reducers);
