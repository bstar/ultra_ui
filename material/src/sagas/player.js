import React from 'react';
import { takeLatest, put, call, all, throttle, select } from 'redux-saga/effects';
import { get } from 'lodash';
import * as types from 'constants/ActionTypes';
import { fetchPlayer, fetchPlayers, postPlayersToList, deletePlayerFromList, batchUpdatePlayers } from '../api/player';

import {
    getPlayerSuccess,
    getPlayersSuccess,
    addPlayersToListSuccess,
    closeModalSuccess,
    loadMessageSuccess,
    batchUpdatePlayersSuccess,
} from '../actions';


function* getPlayerSaga (action) {

    const { json, response } = yield call(fetchPlayer, action.payload.id, action.payload.query);

    yield put(getPlayerSuccess(json, { response }));
};

function* getPlayersSaga (action) {

    const { json, response } = yield call(fetchPlayers, action.meta);

    yield put(getPlayersSuccess(json, { response }));
};

function* addPlayersToListSaga (action) {

    console.log("CALLED!!!!!!!!!!!!!!!!!!!!!")
    const { listId, ids, selections } = action.payload;
    const { response } = yield call(postPlayersToList, { listId, boidIds: ids }, action.payload.query);

    // TODO create new saga to handle singular players with selections, don't do this here
    if (ids.length === 1) {
        yield put(addPlayersToListSuccess({ selections, listId, boidId: ids[0] }, { response }));
    }

    // yield put({ type: 'GET_LISTS' });
    yield put(closeModalSuccess({ id: 'addPlayersToList' }));
    yield put(loadMessageSuccess({ open: true, text: <b>Player added to list!</b> }));
};

function* removePlayerFromListSaga (action) {

    const { listId, playerId, listName, boidName, key } = action.payload;
    const { response } = yield call(deletePlayerFromList, { listId, boidId: playerId }, action.payload.query);
    const text = <b><span style={{ color: '#eee' }}>{boidName}</span> removed from <span style={{ color: '#eee' }}>{listName} list</span></b>;

    yield put(loadMessageSuccess({ open: true, text }));
    yield put({ type: 'GET_LISTS_BY_KEY', payload: { key }});
};

function* batchPlayersUpdateSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(batchUpdatePlayers, action.payload.players, token, action.payload.query);

    yield put(batchUpdatePlayersSuccess(json, { response }));
    yield put(closeModalSuccess({ id: 'batchUpdatePlayers' }));
    yield put(loadMessageSuccess({ open: true, text: <b>Players Updated!</b> }));
};


export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_PLAYER, getPlayerSaga),
        takeLatest(types.ADD_PLAYERS_TO_LIST, addPlayersToListSaga),
        takeLatest(types.REMOVE_PLAYER_FROM_LIST, removePlayerFromListSaga),
        throttle(500, types.GET_PLAYERS, getPlayersSaga),
        takeLatest(types.BATCH_UPDATE_PLAYERS, batchPlayersUpdateSaga),
    ]);
};
