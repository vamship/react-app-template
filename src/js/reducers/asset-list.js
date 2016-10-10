import { handleActions } from 'redux-actions';
import { assetListActions } from '../actions';

const ASSET_LIST_UPDATE_STARTED = assetListActions.assetListUpdateStarted.toString();
const ASSET_LIST_INITIALIZED = assetListActions.assetListInitialized.toString();
const ASSET_LIST_INVALIDATED = assetListActions.assetListInvalidated.toString();

const assetList = handleActions({
    [ ASSET_LIST_INVALIDATED ]: (state, action) => {
        const errorMessage = action.payload;
        return Object.assign({}, state, {
            items: [],
            errorMessage,
            isUpdating: false,
            validUntil: 0
        });
    },
    [ ASSET_LIST_INITIALIZED ]: (state, action) => {
        const listInfo = action.payload;
        return Object.assign({}, state, {
            items: listInfo.items,
            validUntil: listInfo.validUntil,
            isUpdating: false
        });
    },
    [ ASSET_LIST_UPDATE_STARTED ]: (state, action) => {
        return Object.assign({}, state, {
            errorMessage: '',
            isUpdating: true
        });
    }
}, {
    items: [],
    errorMessage: '',
    validUntil: 0,
    isUpdating: false
});

export default assetList;
