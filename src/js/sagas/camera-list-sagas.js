import { takeEvery, delay } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { cameraListActions } from '../actions';
import DataAccess from './helpers/data-access'

const cameraListDataAccess = new DataAccess('/camera', 'Camera list');

function* fetchCameraList(action) {
    const cameraList = yield select((state) => state.cameraList);
    if (cameraList.isUpdating) {
        console.log('Camera list is updating. Skipping fetch');
        return;
    } else if (cameraList.validUntil > Date.now()) {
        console.log('Camera list is already in cache');
        yield put(cameraListActions.cameraListInitialized({
            items: cameraList.items,
            validUntil: cameraList.validUntil
        }));
        return;
    }
    yield put(cameraListActions.cameraListUpdateStarted());

    try {
        const items = yield call([cameraListDataAccess, cameraListDataAccess.fetch]);
        yield put(cameraListActions.cameraListInitialized({
            items,
            validUntil: Date.now() + (60 * 1000)
        }));
    } catch (ex) {
        yield put(cameraListActions.cameraListInvalidated(ex.message));
    }
}

export default function* cameraSagas() {
    yield[
        fork(takeEvery, cameraListActions.cameraListFetch.toString(), fetchCameraList)
    ];
}
