import { all, fork } from 'redux-saga/effects';

import Player from './player';
import Att from './attribute';
import List from './list';
import User from './user';


export default function* root () {
    yield all([
        fork(Player),
        fork(Att),
        fork(List),
        fork(User),
    ]);
};