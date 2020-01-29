import * as types from '../constants/ActionTypes';
import { universalActionCreator } from 'utils';


export const getPlayer = (id, meta) => (universalActionCreator(types.GET_PLAYER, { id }, meta));
export const getPlayerSuccess = (json, meta) => (universalActionCreator(types.GET_PLAYER_SUCCESS, json, meta));

export const getAttributes = (id, meta) => (universalActionCreator(types.GET_ATTRIBUTES, { id }, meta));
export const getAttributesSuccess = (json, meta) => (universalActionCreator(types.GET_ATTRIBUTES_SUCCESS, json, meta));