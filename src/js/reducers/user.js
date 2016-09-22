'use strict';

import { handleActions } from 'redux-actions';
import { loginActions } from '../actions';

const LOGIN_SUCCESS = loginActions.loginSuccess.toString();
const LOGIN_IN_PROGRESS = loginActions.loginInProgress.toString();
const LOGIN_FAIL = loginActions.loginFail.toString();

const user = handleActions({
    [ LOGIN_SUCCESS ]: (state, action) => {
        const user = action.payload;
        return Object.assign({}, state, {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: (user.roles || []).map(role => role),
            authToken: user.authToken,
            isUpdating: false,
            loginError: ''
        });
    },
    [ LOGIN_FAIL ]: (state, action) => {
        const message = action.payload;
        return Object.assign({}, state, {
            loginError: message,
            isUpdating: false
        });
    },
    [ LOGIN_IN_PROGRESS ]: (state, action) => {
        const username = action.payload;
        return Object.assign({}, state, {
            username: username,
            loginError: '',
            isUpdating: true
        });
    }
}, {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    roles: [],
    authToken: null,
    isUpdating: false,
    loginError: ''
});

export default user;
