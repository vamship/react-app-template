import { takeEvery, delay } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { userActions, navActions } from '../actions';

function* loginUser(action) {
    const credentials = action.payload;
    yield put(userActions.userSessionUpdateStarted(credentials.username));

    if (credentials.username === '') {
        yield put(userActions.userSessionInvalidated('Invalid username'));
        return;
    }
    if (credentials.password === '') {
        yield put(userActions.userSessionInvalidated('Invalid password'));
        return;
    }
    yield call(delay, 2000);
    if (credentials.username !== credentials.password) {
        yield put(userActions.userSessionInvalidated('Invalid username and/or password'));
        return;
    }
    yield put(userActions.userSessionInitialized({
        username: credentials.username,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@nowhere.com',
        roles: ['user'],
        authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indjb3lvdGUiLCJhY2NvdW50SWQiOiJhY21lY29ycCIsInJvbGVzIjpbInVzZXIiXX0.L13lrC5RmrfZzaDXRMwVSqkH1keHh4nYEalQfg3kXFU',
        tokenValidUntil: Date.now() + (60 * 1000)
    }));
    yield put(navActions.navRedirect());
}

function* logoutUser() {
    yield put(userActions.userSessionInvalidated(''));
    yield put(navActions.navRedirect('/'));
}

export default function* userSagas() {
    yield[
        fork(takeEvery, userActions.userLogin.toString(), loginUser),
        fork(takeEvery, userActions.userLogout.toString(), logoutUser)
    ];
}
