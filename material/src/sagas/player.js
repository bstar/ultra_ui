import { takeLatest, put, call, all, throttle } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { fetchPlayer, fetchPlayers } from '../api/player';

import {
    getPlayerSuccess,
    getPlayersSuccess,
    // getPlayerFailure,
} from '../actions';


function* getPlayerSaga (action) {

    const { json, response } = yield call(fetchPlayer, action.payload.id, action.payload.query);

    yield put(getPlayerSuccess(json, { response }));
}

function* getPlayersSaga (action) {

    const { json, response } = yield call(fetchPlayers, action.meta);

    yield put(getPlayersSuccess(json, { response }));
}

export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_PLAYER, getPlayerSaga),
        throttle(500, types.GET_PLAYERS, getPlayersSaga),
    ]);
};
