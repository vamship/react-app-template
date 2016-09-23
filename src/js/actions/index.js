import { createActions } from 'redux-actions';

export const loginActions = createActions(
    'LOGIN_REQUEST',
    'LOGIN_SUBMIT',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',
    'LOGIN_IN_PROGRESS',
    'LOGOUT_SUBMIT',
    'LOGOUT_COMPLETE'
);

export const navActions = createActions(
    'NAV_SET_REDIRECT',
    'NAV_DO_REDIRECT'
);
