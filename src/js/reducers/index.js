'use strict';

import { combineReducers } from 'redux';
import user from './user';
import layout from './layout';

const rootReducer = combineReducers({
    layout,
    user
});

export default rootReducer;
