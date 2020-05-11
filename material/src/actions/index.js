import * as types from '../constants/ActionTypes';
import { universalActionCreator } from 'utils';


export const getPlayer = (id, meta) => (universalActionCreator(types.GET_PLAYER, { id }, meta));
export const getPlayerSuccess = (json, meta) => (universalActionCreator(types.GET_PLAYER_SUCCESS, json, meta));

export const getAttributes = (id, meta) => (universalActionCreator(types.GET_ATTRIBUTES, { id }, meta));
export const getAttributesSuccess = (json, meta) => (universalActionCreator(types.GET_ATTRIBUTES_SUCCESS, json, meta));

export const getLists = (meta) => (universalActionCreator(types.GET_LISTS, {}, meta));
export const getListsSuccess = (json, meta) => (universalActionCreator(types.GET_LISTS_SUCCESS, json, meta));

export const getList = (id, meta) => (universalActionCreator(types.GET_LIST, { id }, meta));
export const getListSuccess = (json, meta) => (universalActionCreator(types.GET_LIST_SUCCESS, json, meta));

export const setActiveList = (id, meta) => (universalActionCreator(types.SET_ACTIVE_LIST, { id }, meta));

export const setPlayerRank = (player, meta) => (universalActionCreator(types.SET_PLAYER_RANK, { player }, meta));
export const setPlayerRankSuccess = (json, meta) => (universalActionCreator(types.SET_PLAYER_RANK_SUCCESS, json, meta));