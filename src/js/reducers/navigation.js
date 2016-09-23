import { handleActions } from 'redux-actions';
import { navActions } from '../actions';

const NAV_SET_REDIRECT = navActions.navSetRedirect.toString();

const nav = handleActions({
    [ NAV_SET_REDIRECT ]: (state, action) => {
        const url = action.payload;
        return Object.assign(state, {}, {
            redirectUrl: url
        });
    }
}, {
    redirectUrl: ''
});
