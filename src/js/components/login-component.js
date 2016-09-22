'use strict';

import React, { PropTypes } from 'react';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.initialUsername,
            password: ''
        };
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onLoginSubmit({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        return (
            <div>
              <form onSubmit={ this.handleSubmit.bind(this) }>
                <span><label htmlFor="username"> Username </label> <input type="text" onChange={ this.handleUsernameChange.bind(this) } value={ this.state.username } /></span>
                <span><label htmlFor="password"> Password </label> <input type="text" onChange={ this.handlePasswordChange.bind(this) } value={ this.state.password } /></span>
                { this.props.errorMessage &&
                  <span>{ this.props.errorMessage }</span> }
                { this.props.isUpdating &&
                  <span>Working ...</span> }
                <button type="submit">
                  Submit
                </button>
              </form>
            </div>
            );
    }
}

LoginComponent.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    initialUsername: PropTypes.string,
    errorMessage: PropTypes.string
};

export default LoginComponent;
