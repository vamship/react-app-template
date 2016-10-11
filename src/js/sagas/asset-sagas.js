import { takeEvery, delay } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { assetListActions } from '../actions';
import DataAccess from './helpers/data-access'

const assetListDataAccess = new DataAccess('/asset', 'Asset list');

function* fetchAssetList(action) {
    const assetList = yield select((state) => state.assetList);
    if (assetList.isUpdating) {
        console.log('Asset list is updating. Skipping fetch');
        return;
    } else if (assetList.validUntil > Date.now()) {
        console.log('Asset list is already in cache');
        yield put(assetListActions.assetListInitialized({
            items: assetList.items,
            validUntil: assetList.validUntil
        }));
        return;
    }
    yield put(assetListActions.assetListUpdateStarted());

    try {
        const items = yield call([assetListDataAccess, assetListDataAccess.fetch]);
        yield put(assetListActions.assetListInitialized({
            items,
            validUntil: Date.now() + (60 * 1000)
        }));
    } catch (ex) {
        yield put(assetListActions.assetListInvalidated(ex.message));
    }
}

export default function* assetSagas() {
    yield[
        fork(takeEvery, assetListActions.assetListFetch.toString(), fetchAssetList)
    ];
}
