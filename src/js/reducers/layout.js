import { handleActions } from 'redux-actions';

const layout = handleActions({
}, {
    title: 'Industrial Thermal Monitoring',
    shortTitle: 'ITMS',
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
