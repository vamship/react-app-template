import { takeEvery } from 'redux-saga';
import { call, fork, select } from 'redux-saga/effects';
import { navActions } from '../actions';
import { navigator } from '../routes';

function* doRedirect(action) {
    const state = yield select();
    const url = action.payload || state.nav.redirectUrl || '/';

    yield call(navigator.goto, url);
}

export default function* navSagas() {
    yield[
        fork(takeEvery, navActions.navDoRedirect.toString(), doRedirect)
    ];
}
