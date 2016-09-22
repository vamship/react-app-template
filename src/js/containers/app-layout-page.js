'use strict';

import { connect } from 'react-redux';

import AppLayoutComponent from '../components/app-layout-component';

const mapStateToProps = function(state) {
    return {
        title: state.layout.title || '',
        sidebarNav: state.layout.sidebarNav || []
    };
};

const mapDispatchTopProps = function(dispatch) {
    return {
    };
};

const AppLayoutPage = connect(
    mapStateToProps,
    mapDispatchTopProps
)(AppLayoutComponent);

export default AppLayoutPage;
