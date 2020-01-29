// import { takeLatest, take, put, fork, call, race, all } from 'redux-saga/effects';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { fetchPlayer } from '../api/player';

import {
    getPlayerSuccess,
    // getPlayerFailure,
} from '../actions';


function* getPlayerSaga (action) {

    const { json, response } = yield call(fetchPlayer, action.payload.id, action.payload.query);

    yield put(getPlayerSuccess(json, { response }));
}

export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_PLAYER, getPlayerSaga),
    ]);
};
