'use strict';

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class AppRootComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        this.props.readyToRender.then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <MuiThemeProvider muiTheme={ this.props.theme }>
                  <div style={ { position: 'absolute', top: '10%', left: '50%' } }>
                    <div style={ { width: '80%', margin: 'auto' } }>
                      <CircularProgress size={ 0.5 } />
                    </div>
                    <div>
                      Initializing ...
                    </div>
                  </div>
                </MuiThemeProvider>
                );
        }
        return (
            <MuiThemeProvider muiTheme={ this.props.theme }>
              <Provider store={ this.props.store }>
                <Router history={ this.props.history } routes={ this.props.routes } />
              </Provider>
            </MuiThemeProvider>
            );
    }
}

AppRootComponent.propTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    readyToRender: PropTypes.shape({
        then: PropTypes.func.isRequired
    }).isRequired,
    store: PropTypes.object.isRequired
};

export default AppRootComponent;
