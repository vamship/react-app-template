import { fork } from 'redux-saga/effects';
import loginSagas from './login-sagas';
import navSagas from './nav-sagas';

export default function*() {
    yield[
        fork(loginSagas),
        fork(navSagas)
    ];
}
