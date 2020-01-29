import { put, all, takeLatest, call } from 'redux-saga/effects';
import * as types from 'constants/ActionTypes';
import { fetchAttributes } from '../api/attribute';

import {
    getAttributesSuccess,
    // getAttributesFailure,
} from '../actions';


function* getAttributesSaga (action) {

    const { json, response } = yield call(fetchAttributes, action.payload, action.payload.query);

    yield put(getAttributesSuccess(json, { response }));
}

export default function* allAttributesSagas () {
    yield all([
        takeLatest(types.GET_PLAYER_SUCCESS, getAttributesSaga),
    ]);
};
