import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
        const style = {
            position: 'absolute',
            top: '30%',
            left: '30%',
            padding: 30,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block'
        };
        return (
            <Paper style={ style } zDepth={ 2 }>
              <div>
                <TextField
                           hintText="username"
                           floatingLabelText="username"
                           onChange={ this.handleUsernameChange.bind(this) }
                           value={ this.state.username } />
              </div>
              <div>
                <TextField
                           hintText="password"
                           floatingLabelText="password"
                           type="password"
                           onChange={ this.handlePasswordChange.bind(this) }
                           value={ this.state.password } />
              </div>
              { this.props.errorMessage &&
                <span>{ this.props.errorMessage }</span> }
              { this.props.isUpdating &&
                <span>Working ...</span> }
              <div>
                <RaisedButton primary={ true } label="submit" onClick={ this.handleSubmit.bind(this) } />
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
