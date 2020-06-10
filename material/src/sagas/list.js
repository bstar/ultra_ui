import { takeLatest, takeEvery, put, call, all, select } from 'redux-saga/effects';
import { get } from 'lodash';
import * as types from 'constants/ActionTypes';
import { 
    fetchLists,
    fetchList,
    putPlayerRank,
    createList,
} from '../api/list';
import {
    getListsSuccess,
    getListSuccess,
    setPlayerRankSuccess,
    createListSuccess,
} from '../actions';


function* getListsSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token') || localStorage.getItem('token');
    const { json, response } = yield call(fetchLists, token, action.payload.query);

    yield put(getListsSuccess(json, { response }));
}

function* getListSaga (action) {

    const state = yield select();
    const token = get(state, 'user.data.token');
    const { json, response } = yield call(fetchList, action.payload.id, token, action.payload.query);

    yield put(getListSuccess(json, { response }));
}

function* setPlayerRankSaga (action) {

    const { json, response } = yield call(putPlayerRank, action.payload.player, action.payload.query);

    yield put(setPlayerRankSuccess(json, { response }));
}

function* createListSaga (action) {

    console.log("SAGA", action)
    const state = yield select();
    const token = get(state, 'user.data.token');

    const { json, response } = yield call(createList, action.payload, token, action.payload.query);
    yield put(createListSuccess(json, { response }));
}

export default function* allListsSagas () {
    yield all([
        takeLatest(types.GET_LISTS, getListsSaga),
        takeLatest(types.GET_LIST, getListSaga),
        takeLatest(types.SET_ACTIVE_LIST, getListSaga),
        takeEvery(types.SET_PLAYER_RANK, setPlayerRankSaga),
        takeEvery(types.CREATE_LIST, createListSaga),
    ]);
};
