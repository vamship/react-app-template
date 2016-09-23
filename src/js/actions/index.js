import { createActions } from 'redux-actions';

export const loginActions = createActions(
    'LOGIN_REQUEST',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',
    'LOGIN_IN_PROGRESS',
    'LOGOUT_REQUEST',
    'LOGOUT_COMPLETE'
);

export const navActions = createActions(
    'NAV_SET_REDIRECT'
);
