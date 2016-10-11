import { handleActions } from 'redux-actions';
import { cameraListActions } from '../actions';

const CAMERA_LIST_UPDATE_STARTED = cameraListActions.cameraListUpdateStarted.toString();
const CAMERA_LIST_INITIALIZED = cameraListActions.cameraListInitialized.toString();
const CAMERA_LIST_INVALIDATED = cameraListActions.cameraListInvalidated.toString();

const cameraList = handleActions({
    [ CAMERA_LIST_INVALIDATED ]: (state, action) => {
        const errorMessage = action.payload;
        return Object.assign({}, state, {
            items: [],
            errorMessage,
            isUpdating: false,
            validUntil: 0
        });
    },
    [ CAMERA_LIST_INITIALIZED ]: (state, action) => {
        const listInfo = action.payload;
        return Object.assign({}, state, {
            items: listInfo.items,
            validUntil: listInfo.validUntil,
            isUpdating: false
        });
    },
    [ CAMERA_LIST_UPDATE_STARTED ]: (state, action) => {
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

export default cameraList;
