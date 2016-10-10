import { fork } from 'redux-saga/effects';
import userSagas from './user-sagas';
import navSagas from './nav-sagas';

export default function*() {
    yield[
        fork(userSagas),
        fork(navSagas)
    ];
}
