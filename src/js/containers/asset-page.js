import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import { navigator } from '../routes';
import { loginActions } from '../actions';

class AssetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.gotoDashboard = navigator.getNavAction('/dashboard');
    }

    render() {
        return (
            <div>
              <div>
                <strong>Assets</strong>
                <div>
                  <div style={ { padding: 10 } }>
                    <RaisedButton label="Dashboard" onClick={ this.gotoDashboard } secondary={ true } />
                  </div>
                </div>
              </div>
            </div>
            );
    }
}

AssetComponent.propTypes = {
    doLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = function(dispatch) {
    return {
        doLogout: () => {
            dispatch(loginActions.logoutSubmit());
        }
    };
};

const AssetPage = connect(
    undefined,
    mapDispatchToProps
)(AssetComponent);


export default AssetPage;
