import { fork } from 'redux-saga/effects';
import loginSagas from './login-sagas';

export default function*() {
    yield[
        fork(loginSagas)
    ];
}
