import { takeLatest, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from 'constants/ActionTypes';
import { fetchJWT, postUser } from '../api/user';
import { getJWTSuccess, invalidateJWTUserSuccess, registerUserSuccess } from '../actions';


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

function* regsterUserSaga (action) {

    const { name, password, email } = action.payload.user;
    const { json, response } = yield call(postUser, { name, email, password }, action.payload.query);

    yield put(registerUserSuccess(json, { response }));
    yield put(push('/app/activate'));
};

export default function* allUsersSagas () {
    yield all([
        takeLatest(types.GET_JWT, getJWTSaga),
        takeLatest(types.SET_JWT_USER, setJWTUserSaga),
        takeLatest(types.INVALIDATE_JWT_USER, invalidateJWTUserSaga),
        takeLatest(types.REGISTER_USER, regsterUserSaga),
    ]);
};
