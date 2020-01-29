import { all, fork } from 'redux-saga/effects';

import Player from './player';
import Att from './attribute';


export default function* root () {
    yield all([
        fork(Player),
        fork(Att),
    ]);
}