import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.initialUsername,
            usernameErrorMessage: '',
            password: '',
            passwordErrorMessage: ''
        };
    }

    handleUsernameChange(e) {
        const message = (e.target.value !== '') ? '' : 'Password cannot be empty';
        this.setState({
            username: e.target.value,
            passwordErrorMessage: message
        });
    }

    handlePasswordChange(e) {
        const message = (e.target.value !== '') ? '' : 'Password cannot be empty';
        this.setState({
            password: e.target.value,
            passwordErrorMessage: message
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
        const loginBoxStyle = {
            position: 'absolute',
            width: 320,
            height: 400,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: 'auto',
            padding: 30,
            textAlign: 'center',
            display: 'inline-block'
        };
        const messageStyle = {
            textAlign: 'left',
            paddingTop: 20,
            fontSize: 12,
            lineHeight: '12px',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        };
        const errorStyle = Object.assign({}, messageStyle, {
            color: 'rgb(244, 67, 54)'
        });

        return (
            <Paper style={ loginBoxStyle } zDepth={ 2 }>
              <h2>React App</h2>
              <div>
                <TextField
                           hintText="username"
                           floatingLabelText="username"
                           disabled={ this.props.isUpdating }
                           onChange={ this.handleUsernameChange.bind(this) }
                           errorText={ this.state.usernameErrorMessage }
                           value={ this.state.username } />
              </div>
              <div>
                <TextField
                           hintText="password"
                           floatingLabelText="password"
                           type="password"
                           disabled={ this.props.isUpdating }
                           onChange={ this.handlePasswordChange.bind(this) }
                           errorText={ this.state.passwordErrorMessage }
                           value={ this.state.password } />
              </div>
              <div style={ { paddingTop: 40 } }>
                <RaisedButton
                              primary={ true }
                              label="submit"
                              disabled={ this.props.isUpdating }
                              onClick={ this.handleSubmit.bind(this) } />
              </div>
              { this.props.errorMessage &&
                <div style={ errorStyle }>
                  { this.props.errorMessage }
                </div> }
              { this.props.isUpdating &&
                <div style={ messageStyle }>
                  Working ...
                </div> }
            </Paper>
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
