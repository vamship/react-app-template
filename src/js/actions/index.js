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
