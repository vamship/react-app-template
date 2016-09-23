import { loginActions, navActions } from '../actions';
import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

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
}

function* logoutRequest(action) {
    yield put(loginActions.logoutComplete());
    console.log('TODO: Redirect to home page');
}

export default function*() {
    yield[
        fork(takeEvery, loginActions.loginRequest.toString(), loginRequest),
        fork(takeEvery, loginActions.logoutRequest.toString(), logoutRequest)
    ];
}
