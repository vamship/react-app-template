import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';
import nav from './nav';
import assetList from './asset-list';
import cameraList from './camera-list';

const rootReducer = combineReducers({
    layout,
    nav,
    user,
    assetList,
    cameraList
});

export default rootReducer;
