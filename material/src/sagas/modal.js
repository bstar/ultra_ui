import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { openModalSuccess, closeModalSuccess } from '../actions';


function* openModalSaga (action) {

    const { id } = action.payload;

    console.log("SAGA", action.payload);

    yield put(openModalSuccess({ id }, {}));
};

function* closeModalSaga (action) {

    const { id } = action.payload;

    yield put(closeModalSuccess({ id }, {}));
};


export default function* allMessagesSagas () {
    yield all([
        takeLatest(types.OPEN_MODAL, openModalSaga),
        takeLatest(types.CLOSE_MODAL, closeModalSaga),
    ]);
};
