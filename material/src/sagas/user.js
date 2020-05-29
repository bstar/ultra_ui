import { takeLatest, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from 'constants/ActionTypes';
import { fetchJWT } from '../api/user';
import { getJWTSuccess, invalidateJWTUserSuccess } from '../actions';


function* getJWTSaga (action) {

    const { username, password } = action.payload;
    const { json, response } = yield call(fetchJWT, username, password, action.payload.query);

    localStorage.setItem('token', json.token);
    yield put(getJWTSuccess(json, { response }));
    yield put(push('/'));
};

function* setJWTUserSaga (action) {

    const { token } = action.payload;
    const json = { auth: true, token, message: 'User found in local storage and logged in'}

    yield put(getJWTSuccess(json));
};

function* invalidateJWTUserSaga () {

    localStorage.removeItem('token'); 
    yield put(invalidateJWTUserSuccess());
};

export default function* allPlayersSagas () {
    yield all([
        takeLatest(types.GET_JWT, getJWTSaga),
        takeLatest(types.SET_JWT_USER, setJWTUserSaga),
        takeLatest(types.INVALIDATE_JWT_USER, invalidateJWTUserSaga),
    ]);
};
