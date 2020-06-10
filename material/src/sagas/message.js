import { takeLatest, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from 'constants/ActionTypes';
import { loadMessageSuccess, closeMessageSuccess } from '../actions';


function* loadMessageSaga (action) {

    const { text } = action.payload;

    console.log("FROM SAGA", text)
    yield put(loadMessageSuccess(text, {}));
};

export default function* allMessagesSagas () {
    yield all([
        takeLatest(types.LOAD_MESSAGE, loadMessageSaga),
    ]);
};







// function* getListSaga (action) {

//     const state = yield select();
//     const token = get(state, 'user.data.token');
//     const { json, response } = yield call(fetchList, action.payload.id, token, action.payload.query);

//     yield put(getListSuccess(json, { response }));
// }
