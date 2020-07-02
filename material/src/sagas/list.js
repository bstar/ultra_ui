import React from 'react';
import { takeLatest, takeEvery, put, call, all, select } from 'redux-saga/effects';
import { get } from 'lodash';
import * as types from 'constants/ActionTypes';
import { 
    fetchLists,
    fetchListsByType,
    fetchList,
    putPlayerRank,
    putPlayerRanks,
    putPlayerData,
    createList,
} from '../api/list';
import {
    getLists,
    getListsByType,
    getListsSuccess,
    getListsByTypeSuccess,
    getListSuccess,
    setPlayerRankSuccess,
    batchPlayerRanksSuccess,
    setPlayerDataSuccess,
    createListSuccess,
    closeModalSuccess,
    loadMessageSuccess,
} from '../actions';


function* getListsSaga () {

    const state = yield select();
    const token = get(state, 'user.data.token') || localStorage.getItem('token');
    const { json, response } = yield call(fetchLists, token);

    yield put(getListsSuccess(json, { response }));
};

function* getListsByTypeSaga (action) {

    console.log("SAGA ACTION", action.payload)

    const state = yield select();
    const token = get(state, 'user.data.token') || localStorage.getItem('token');
    const type = action.payload.type;

    const { json, response } = yield call(fetchListsByType, type, token, action.payload.query);

    console.log("SAGA JSON", json)
    yield put(getListsByTypeSuccess({ type, lists: json }, { response }));
};

function* getListSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(fetchList, action.payload.id, token, action.payload.query);

    yield put(getListSuccess(json, { response }));
};

function* setPlayerRankSaga (action) {

    const { json, response } = yield call(putPlayerRank, action.payload.player, action.payload.query);

    yield put(setPlayerRankSuccess(json, { response }));
};

function* batchPlayerRanksSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(putPlayerRanks, action.payload.listId, action.payload.players, token, action.payload.query);

    yield put(batchPlayerRanksSuccess(json, { response }));
    // yield put(getLists()); // TODO update to refresh proper list key
};

function* setPlayerDataSaga (action) {

    const { listId, boidId, selections } = action.payload;
    const { teamSelection, gmSelection, gradeSelection } = selections;
    const state = yield select();
    const token = get(state, 'user.data.token');

    // TODO selection names not matching is clunky
    const { json, response } = yield call(putPlayerData, listId, { boidId, ...{ team: teamSelection, gm: gmSelection, grade: gradeSelection } }, token, action.payload.query);

    yield put(setPlayerDataSuccess(json, { response }));
};

function* createListSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(createList, action.payload, token, action.payload.query);

    yield put(createListSuccess(json, { response }));
};

function* createListSuccessSaga () {

    yield put(closeModalSuccess({ id: 'createListModal' }));
    yield put(loadMessageSuccess({ open: true, text: <b>New list created!</b> }));
    // yield getListsSaga(); // TODO update to refresh proper list key
};

export default function* allListsSagas () {
    yield all([
        takeLatest(types.GET_LISTS, getListsSaga),
        takeLatest(types.GET_LISTS_BY_TYPE, getListsByTypeSaga),
        takeLatest(types.GET_LIST, getListSaga),
        takeLatest(types.SET_ACTIVE_LIST, getListSaga),
        takeEvery(types.SET_PLAYER_RANK, setPlayerRankSaga),
        takeEvery(types.BATCH_PLAYER_RANKS, batchPlayerRanksSaga),
        takeEvery(types.ADD_PLAYERS_TO_LIST_SUCCESS, setPlayerDataSaga),
        takeEvery(types.CREATE_LIST, createListSaga),
        takeEvery(types.CREATE_LIST_SUCCESS, createListSuccessSaga),
    ]);
};
