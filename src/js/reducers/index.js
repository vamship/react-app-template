import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';
import nav from './nav';
import assetList from './asset-list';

const rootReducer = combineReducers({
    layout,
    nav,
    user,
    assetList
});

export default rootReducer;
