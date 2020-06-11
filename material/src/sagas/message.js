import { takeLatest, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from 'constants/ActionTypes';
import { loadMessageSuccess, closeMessageSuccess } from '../actions';


function* loadMessageSaga (action) {

    const { text } = action.payload;

    yield put(loadMessageSuccess(text, {}));
};

export default function* allMessagesSagas () {
    yield all([
        takeLatest(types.LOAD_MESSAGE, loadMessageSaga),
    ]);
};
