import { handleActions } from 'redux-actions';

const layout = handleActions({
}, {
    title: 'React App',
    sidebarNav: [{
        title: 'Home',
        url: '/'
    }, {
        title: 'Dashboard',
        url: '/dashboard'
    }]
});

export default layout;
