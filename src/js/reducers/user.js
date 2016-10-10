import { handleActions } from 'redux-actions';
import { userActions } from '../actions';

const USER_SESSION_UPDATE_STARTED = userActions.userSessionUpdateStarted.toString();
const USER_SESSION_INITIALIZED = userActions.userSessionInitialized.toString();
const USER_SESSION_INVALIDATED = userActions.userSessionInvalidated.toString();

const user = handleActions({
    [ USER_SESSION_INVALIDATED ]: (state, action) => {
        const message = action.payload;
        return Object.assign({}, state, {
            loginError: message,
            isUpdating: false,
            authToken: '',
            tokenValidUntil: 0
        });
    },
    [ USER_SESSION_INITIALIZED ]: (state, action) => {
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
    [ USER_SESSION_UPDATE_STARTED ]: (state, action) => {
        const username = action.payload;
        return Object.assign({}, state, {
            username: username,
            loginError: '',
            isUpdating: true
        });
    }
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
