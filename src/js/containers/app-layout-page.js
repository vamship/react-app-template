import { connect } from 'react-redux';
import AppLayoutComponent from '../components/app-layout-component';

const mapStateToProps = function(state) {
    return {
        title: state.layout.title || '',
        sidebarNav: state.layout.sidebarNav || []
    };
};

const AppLayoutPage = connect(
    mapStateToProps
)(AppLayoutComponent);

export default AppLayoutPage;
