import { takeEvery, delay } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { assetListActions } from '../actions';

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
        yield call(delay, 2000);
        // if (Math.random() > 0.8) {
        //     throw new Error('Asset fetch failed (simulated error)');
        // }
        const items = [];
        for (let index = 1; index <= 10; index++) {
            items.push({
                assetId: `Asset_${index}`,
                name: `Asset #${index}`,
                floorMapId: `floormap_${(index%3) + 1}`,
                description: `Description for asset #${index}`
            });
        }

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
