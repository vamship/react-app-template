import { handleActions } from 'redux-actions';
import { navActions } from '../actions';

const NAV_REDIRECT_SAVED = navActions.navRedirectSaved.toString();

const nav = handleActions({
    [ NAV_REDIRECT_SAVED ]: (state, action) => {
        const url = action.payload;
        return Object.assign(state, {}, {
            redirectUrl: url
        });
    }
}, {
    redirectUrl: ''
});

export default nav;
