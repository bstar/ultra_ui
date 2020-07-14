import * as types from '../constants/ActionTypes';
import { universalActionCreator } from 'utils';


export const getPlayer = (id, meta) => (universalActionCreator(types.GET_PLAYER, { id }, meta));
export const getPlayerSuccess = (json, meta) => (universalActionCreator(types.GET_PLAYER_SUCCESS, json, meta));

export const getPlayers = meta => (universalActionCreator(types.GET_PLAYERS, {}, meta));
export const getPlayersSuccess = (json, meta) => (universalActionCreator(types.GET_PLAYERS_SUCCESS, json, meta));

export const getAttributes = (id, meta) => (universalActionCreator(types.GET_ATTRIBUTES, { id }, meta));
export const getAttributesSuccess = (json, meta) => (universalActionCreator(types.GET_ATTRIBUTES_SUCCESS, json, meta));

export const getLists = (meta) => (universalActionCreator(types.GET_LISTS, {}, meta));
export const getListsSuccess = (json, meta) => (universalActionCreator(types.GET_LISTS_SUCCESS, json, meta));

export const getListsByKey = (key, meta) => (universalActionCreator(types.GET_LISTS_BY_KEY, { key }, meta));
export const getListsByKeySuccess = (json, meta) => (universalActionCreator(types.GET_LISTS_BY_KEY_SUCCESS, json, meta));

export const invalidateLists = (meta) => (universalActionCreator(types.INVALIDATE_LISTS, {}, meta));
export const invalidateListsSuccess = (json, meta) => (universalActionCreator(types.INVALIDATE_LISTS_SUCCESS, json, meta));

export const getList = (id, meta) => (universalActionCreator(types.GET_LIST, { id }, meta));
export const getListSuccess = (json, meta) => (universalActionCreator(types.GET_LIST_SUCCESS, json, meta));

export const createList = (list, meta) => (universalActionCreator(types.CREATE_LIST, list, meta));
export const createListSuccess = (json, meta) => (universalActionCreator(types.CREATE_LIST_SUCCESS, json, meta));

export const deleteList = (id, meta) => (universalActionCreator(types.DELETE_LIST, { id }, meta));
export const deleteListSuccess = (json, meta) => (universalActionCreator(types.DELETE_LIST_SUCCESS, json, meta));

export const removePlayerFromList = (listId, playerId, listName, boidName, meta) => (universalActionCreator(types.REMOVE_PLAYER_FROM_LIST, { listId, playerId, listName, boidName }, meta));
export const removePlayerFromListSuccess = (json, meta) => (universalActionCreator(types.REMOVE_PLAYER_FROM_LIST_SUCCESS, json, meta));

export const setActiveList = (id, key, meta) => (universalActionCreator(types.SET_ACTIVE_LIST, { id, key }, meta));

export const setPlayerRank = (player, meta) => (universalActionCreator(types.SET_PLAYER_RANK, { player }, meta));
export const setPlayerRankSuccess = (json, meta) => (universalActionCreator(types.SET_PLAYER_RANK_SUCCESS, json, meta));

export const batchPlayerRanks = (listId, players, key, meta) => (universalActionCreator(types.BATCH_PLAYER_RANKS, { listId, players, key }, meta));
export const batchPlayerRanksSuccess = (json, meta) => (universalActionCreator(types.BATCH_PLAYER_RANKS_SUCCESS, json, meta));

export const setPlayerData = (data, meta) => (universalActionCreator(types.SET_PLAYER_DATA, { data }, meta));
export const setPlayerDataSuccess = (json, meta) => (universalActionCreator(types.SET_PLAYER_DATA_SUCCESS, json, meta));

export const getJWT = (username, password, meta) => (universalActionCreator(types.GET_JWT, { username, password }, meta));
export const getJWTSuccess = (json, meta) => (universalActionCreator(types.GET_JWT_SUCCESS, json, meta));

export const setJWTUser = (token, meta) => (universalActionCreator(types.SET_JWT_USER, { token }, meta));
export const invalidateJWTUser = () => (universalActionCreator(types.INVALIDATE_JWT_USER, {}));
export const invalidateJWTUserSuccess = (json, meta) => (universalActionCreator(types.INVALIDATE_JWT_USER_SUCCESS, json, meta));
export const registerUser = (user, meta) =>(universalActionCreator(types.REGISTER_USER, { user }, meta));
export const registerUserSuccess = (json, meta) => (universalActionCreator(types.REGISTER_USER_SUCCESS, json, meta));

export const loadMessage = (text, meta) => (universalActionCreator(types.LOAD_MESSAGE, { text }, meta));
export const loadMessageSuccess = (json, meta) => (universalActionCreator(types.LOAD_MESSAGE_SUCCESS, json, meta));
export const closeMessage = () => (universalActionCreator(types.CLOSE_MESSAGE, {}));
export const closeMessageSuccess = (json, meta) => (universalActionCreator(types.CLOSE_MESSAGE_SUCCESS, json, meta));

export const openModal = (id, meta) => (universalActionCreator(types.OPEN_MODAL, { id }, meta));
export const openModalSuccess = (json, meta) => (universalActionCreator(types.OPEN_MODAL_SUCCESS, json, meta));
export const closeModal = (id, meta) => (universalActionCreator(types.CLOSE_MODAL, { id }, meta));
export const closeModalSuccess = (json, meta) => (universalActionCreator(types.CLOSE_MODAL_SUCCESS, json, meta));

export const addPlayersToList = ({ listId, ids, selections }, meta) => (universalActionCreator(types.ADD_PLAYERS_TO_LIST, { listId, ids, selections }, meta));
export const addPlayersToListSuccess = (json, meta) => (universalActionCreator(types.ADD_PLAYERS_TO_LIST_SUCCESS, json, meta));
