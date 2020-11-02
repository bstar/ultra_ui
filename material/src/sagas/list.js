import React from 'react';
import { takeLatest, takeEvery, put, call, all, select } from 'redux-saga/effects';
import { get } from 'lodash';
import * as types from 'constants/ActionTypes';
import { 
    fetchLists,
    fetchListsByKey,
    fetchList,
    putPlayerRank,
    putPlayerRanks,
    putPlayerData,
    createList,
    deleteList,
} from '../api/list';
import {
    getLists,
    getListsByKey,
    getListsSuccess,
    getListsByKeySuccess,
    getListSuccess,
    setPlayerRankSuccess,
    batchPlayerRanksSuccess,
    setPlayerDataSuccess,
    createListSuccess,
    createListWithPlayersSuccess,
    closeModalSuccess,
    loadMessageSuccess,
    deleteListSuccess,
} from '../actions';


function* getListsSaga () {

    const state = yield select();
    const token = get(state, 'user.data.token') || localStorage.getItem('token');
    const { json, response } = yield call(fetchLists, token);

    yield put(getListsSuccess(json, { response }));
};


function* getListsByKeySaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token') || localStorage.getItem('token');
    const key = action.payload.key;

    const { json, response } = yield call(fetchListsByKey, key, token, action.payload.query);

    yield put(getListsByKeySuccess({ key, lists: json }, { response }));
};

function* getListSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(fetchList, action.payload.id, token, action.payload.query);

    yield put(getListSuccess(json, { response }));
};

function* deleteListSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(deleteList, action.payload.id, token, action.payload.query);

    yield put(deleteListSuccess({ ...json, id: action.payload.id }, { response }));
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
    yield put({ type: 'GET_LISTS_BY_KEY', payload: { key: action.payload.key }});
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
    
    yield getListsByKeySaga({ payload: { key: 'personal' }}); // TODO update to target global vs personal lists
};

function* createListWithPlayersSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { list, boids, query } = action.payload;
    const boidIds = boids ? boids.map(boid => (boid.id)) : [];

    const { json, response } = yield call(createList, list, token, query);

    yield put({ type: 'ADD_PLAYERS_TO_LIST', payload: { listId: json.id, ids: boidIds } });

    yield put(createListWithPlayersSuccess(json, { response }));
};

function* createListWithPlayersSuccessSaga () {

    yield put(closeModalSuccess({ id: 'cloneList' }));
    yield put(loadMessageSuccess({ open: true, text: <b>New list cloned!</b> }));
    yield getListsByKeySaga({ payload: { key: 'personal' }}); // TODO update to target global vs personal lists
};

function* deleteListSuccessSaga () {

    yield put(loadMessageSuccess({ open: true, text: <b>List Successfully Deleted!</b> }));
    yield getListsByKeySaga({ payload: { key: 'personal' }}); // TODO update to target global vs personal lists
};

export default function* allListsSagas () {
    yield all([
        takeLatest(types.GET_LISTS, getListsSaga),
        takeEvery(types.GET_LISTS_BY_KEY, getListsByKeySaga),
        takeLatest(types.GET_LIST, getListSaga),
        takeLatest(types.DELETE_LIST, deleteListSaga),
        takeLatest(types.SET_ACTIVE_LIST, getListSaga),
        takeEvery(types.SET_PLAYER_RANK, setPlayerRankSaga),
        takeEvery(types.BATCH_PLAYER_RANKS, batchPlayerRanksSaga),
        takeEvery(types.ADD_PLAYERS_TO_LIST_SUCCESS, setPlayerDataSaga),
        takeEvery(types.CREATE_LIST, createListSaga),
        takeEvery(types.CREATE_LIST_SUCCESS, createListSuccessSaga),
        takeEvery(types.CREATE_LIST_WITH_PLAYERS, createListWithPlayersSaga),
        takeEvery(types.CREATE_LIST_WITH_PLAYERS_SUCCESS, createListWithPlayersSuccessSaga),
        takeEvery(types.DELETE_LIST_SUCCESS, deleteListSuccessSaga),
    ]);
};
