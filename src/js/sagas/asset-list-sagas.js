import { takeEvery, delay } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { assetListActions } from '../actions';
import fetch from 'isomorphic-fetch';

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
        const user = yield select((state) => state.user);
        const response = yield call(fetch,
            'https://tc171wwqld.execute-api.us-east-1.amazonaws.com/dev/asset',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': user.authToken
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Asset list fetch failed with status: [${response.status}]`);
        }
        const items = yield call(() => {
            return response.json()
        });
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
