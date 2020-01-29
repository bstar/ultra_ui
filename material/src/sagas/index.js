import { all, fork } from 'redux-saga/effects';

import Player from './player';


export default function* root () {
    yield all([
        fork(Player),
    ]);
}