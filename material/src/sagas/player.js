import React from 'react';
import { takeLatest, put, call, all, throttle } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { fetchPlayer, fetchPlayers, postPlayersToList } from '../api/player';

import {
    getPlayerSuccess,
    getPlayersSuccess,
    addPlayersToListSuccess,
    closeModalSuccess,
    loadMessageSuccess,
} from '../actions';


function* getPlayerSaga (action) {

    const { json, response } = yield call(fetchPlayer, action.payload.id, action.payload.query);

    yield put(getPlayerSuccess(json, { response }));
}

function* getPlayersSaga (action) {

    const { json, response } = yield call(fetchPlayers, action.meta);

    yield put(getPlayersSuccess(json, { response }));
}

function* addPlayersToListSaga (action) {

    const { listId, ids } = action.payload;

    const { json, response } = yield call(postPlayersToList, { listId, boidIds: ids }, action.payload.query);


    yield put(addPlayersToListSuccess(json, { response }));
    yield put(closeModalSuccess({ id: 'addPlayersToList' }));
    yield put(loadMessageSuccess({ open: true, text: <b>Player added to list!</b> }));
}

export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_PLAYER, getPlayerSaga),
        takeLatest(types.ADD_PLAYERS_TO_LIST, addPlayersToListSaga),
        throttle(500, types.GET_PLAYERS, getPlayersSaga),
    ]);
};
