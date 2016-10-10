import { createActions } from 'redux-actions';

export const userActions = createActions(
    'USER_SESSION_INVALIDATED',
    'USER_SESSION_INITIALIZED',
    'USER_SESSION_UPDATE_STARTED',
    'USER_LOGIN',
    'USER_LOGOUT'
);

export const navActions = createActions(
    'NAV_REDIRECT_SAVED',
    'NAV_REDIRECT'
);

export const assetListActions = createActions(
    'ASSET_LIST_UPDATE_STARTED',
    'ASSET_LIST_INITIALIZED',
    'ASSET_LIST_INVALIDATED',
    'ASSET_LIST_FETCH'
);
