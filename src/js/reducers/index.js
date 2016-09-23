import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';
import nav from './nav';

const rootReducer = combineReducers({
    layout,
    nav,
    user
});

export default rootReducer;
