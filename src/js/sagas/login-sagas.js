import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { loginActions, navActions } from '../actions';

function* loginRequest(action) {
    const credentials = action.payload;
    yield put(loginActions.loginInProgress(credentials.username));

    if (credentials.username === '') {
        yield put(loginActions.loginFail('Invalid username'));
        return;
    }
    if (credentials.password === '') {
        yield put(loginActions.loginFail('Invalid password'));
        return;
    }
    yield call(delay, 2000);
    if (credentials.username !== credentials.password) {
        yield put(loginActions.loginFail('Invalid username and/or password'));
        return;
    }
    yield put(loginActions.loginSuccess({
        username: credentials.username,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@nowhere.com',
        roles: ['user'],
        authToken: `${credentials.username}__${Date.now()}`
    }));
    yield put(navActions.navDoRedirect());
}

function* logoutRequest() {
    yield put(loginActions.logoutComplete());
    yield put(navActions.navDoRedirect('/'));
}

export default function* loginSagas() {
    yield[
        fork(takeEvery, loginActions.loginRequest.toString(), loginRequest),
        fork(takeEvery, loginActions.logoutRequest.toString(), logoutRequest)
    ];
}
