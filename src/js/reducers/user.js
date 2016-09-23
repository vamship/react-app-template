import { handleActions } from 'redux-actions';
import { loginActions } from '../actions';

const LOGIN_REQUEST = loginActions.loginRequest.toString();
const LOGIN_SUCCESS = loginActions.loginSuccess.toString();
const LOGIN_IN_PROGRESS = loginActions.loginInProgress.toString();
const LOGIN_FAIL = loginActions.loginFail.toString();
const LOGOUT_COMPLETE = loginActions.logoutComplete.toString();

const user = handleActions({
    [ LOGIN_REQUEST ]: (state, action) => {
        const message = action.payload;
        return Object.assign({}, state, {
            loginError: message
        });
    },
    [ LOGIN_SUCCESS ]: (state, action) => {
        const user = action.payload;
        return Object.assign({}, state, {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: (user.roles || []).map(role => role),
            authToken: user.authToken,
            tokenValidUntil: user.tokenValidUntil,
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
    },
    [ LOGOUT_COMPLETE ]: (state) => {
        return Object.assign({}, state, {
            authToken: '',
            tokenValidUntil: 0
        });
    },
}, {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
    authToken: '',
    tokenValidUntil: 0,
    isUpdating: false,
    loginError: ''
});

export default user;
