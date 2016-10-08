import { handleActions } from 'redux-actions';

const layout = handleActions({
}, {
    title: 'React App Template',
    shortTitle: 'React',
    sidebarNav: [{
        title: 'Home',
        url: '/'
    }, {
        title: 'Dashboard',
        url: '/dashboard'
    }, {
        title: 'Video',
        url: '/video'
    }]
});

export default layout;
