// import { takeLatest, take, put, fork, call, race, all } from 'redux-saga/effects';
import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { fetchLists, fetchList, putPlayerRank } from '../api/list';

import {
    getListsSuccess,
    getListSuccess,
    setPlayerRankSuccess,
} from '../actions';


function* getListsSaga (action) {

    const { json, response } = yield call(fetchLists, action.payload.id, action.payload.query);

    yield put(getListsSuccess(json, { response }));
}

function* getListSaga (action) {

    const { json, response } = yield call(fetchList, action.payload.id, action.payload.query);

    yield put(getListSuccess(json, { response }));
}

function* setPlayerRank (action) {

    const { json, response } = yield call(putPlayerRank, action.payload.player, action.payload.query);

    yield put(setPlayerRankSuccess(json, { response }));
}

export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_LISTS, getListsSaga),
        takeLatest(types.GET_LIST, getListSaga),
        takeLatest(types.SET_ACTIVE_LIST, getListSaga),
        takeEvery(types.SET_PLAYER_RANK, setPlayerRank),
    ]);
};
