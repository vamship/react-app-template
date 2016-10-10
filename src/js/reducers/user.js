import { handleActions } from 'redux-actions';
import { userActions } from '../actions';

const USER_SESSION_UPDATE_STARTED = userActions.userSessionUpdateStarted.toString();
const USER_SESSION_INITIALIZED = userActions.userSessionInitialized.toString();
const USER_SESSION_INVALIDATED = userActions.userSessionInvalidated.toString();

const user = handleActions({
    [ USER_SESSION_INVALIDATED ]: (state, action) => {
        const message = action.payload;
        return Object.assign({}, state, {
            errorMessage: message,
            isUpdating: false,
            authToken: '',
            validUntil: 0
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
            validUntil: user.validUntil,
            isUpdating: false,
            errorMessage: ''
        });
    },
    [ USER_SESSION_UPDATE_STARTED ]: (state, action) => {
        const username = action.payload;
        return Object.assign({}, state, {
            username: username,
            errorMessage: '',
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
    validUntil: 0,
    isUpdating: false,
    errorMessage: ''
});

export default user;
