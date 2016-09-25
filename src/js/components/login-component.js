import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import * as styles from '../styles/element-styles';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.initialUsername,
            usernameErrorMessage: '',
            password: '',
            passwordErrorMessage: ''
        };

        this.loginBoxStyle = styles.CenterAlignedDiv
            .merge(styles.CenterAlignedText)
            .merge({
                width: 320,
                height: 380
            });

        this.errorMessageStyle = styles.SmallText
            .merge(styles.ErrorColor)
            .merge({
                paddingTop: 20,
                textAlign: 'left'
            });

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
        return (
            <Paper style={ this.loginBoxStyle.style } zDepth={ 2 }>
              { this.props.isUpdating &&
                <LinearProgress mode="indeterminate" /> }
              <div style={ { padding: 30 } }>
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
                <div style={ { paddingTop: 30 } }>
                  <RaisedButton
                                primary={ true }
                                label="submit"
                                disabled={ this.props.isUpdating }
                                onClick={ this.handleSubmit.bind(this) } />
                </div>
                { this.props.errorMessage &&
                  <div style={ this.errorMessageStyle.style }>
                    { this.props.errorMessage }
                  </div> }
              </div>
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
