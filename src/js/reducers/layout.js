import { handleActions } from 'redux-actions';

const layout = handleActions({
}, {
    title: 'Industrial Thermal Monitoring System',
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
