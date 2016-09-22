'use strict';

import { connect } from 'react-redux';
import { loginActions } from '../actions';

import LoginComponent from '../components/login-component';

const mapStateToProps = function(state) {
    return {
        initialUsername: state.user.username || '',
        isUpdating: state.user.isUpdating,
        errorMessage: state.user.loginError || ''
    };
};

const mapDispatchTopProps = function(dispatch) {
    return {
        onLoginSubmit: (credentials) => {
            dispatch(loginActions.loginRequest(credentials));
        }
    };
};

const LoginPage = connect(
    mapStateToProps,
    mapDispatchTopProps
)(LoginComponent);

export default LoginPage;
