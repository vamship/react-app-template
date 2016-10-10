import { connect } from 'react-redux';
import { userActions } from '../actions';

import LoginComponent from '../components/login-component';

const mapStateToProps = function(state) {
    return {
        title: state.layout.shortTitle || state.layout.title || '',
        initialUsername: state.user.username || '',
        isUpdating: state.user.isUpdating,
        errorMessage: state.user.loginError || ''
    };
};

const mapDispatchTopProps = function(dispatch) {
    return {
        onLoginSubmit: (credentials) => {
            dispatch(userActions.userLogin(credentials));
        }
    };
};

const LoginPage = connect(
    mapStateToProps,
    mapDispatchTopProps
)(LoginComponent);

export default LoginPage;
