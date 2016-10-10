import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import { navigator } from '../routes';
import { userActions } from '../actions';


class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.gotoAssets = navigator.getNavAction('/dashboard/assets');
    }

    render() {
        return (
            <div>
              <div>
                <strong>Dashboard</strong>
                <div>
                  <div style={ { padding: 10 } }>
                    <RaisedButton label="Assets" onClick={ this.gotoAssets } secondary={ true } />
                  </div>
                  <div style={ { padding: 10 } }>
                    <RaisedButton label="Logout" onClick={ this.props.doLogout } secondary={ true } />
                  </div>
                </div>
                <div>
                  { this.props.children }
                </div>
              </div>
            </div>
            );
    }
}

DashboardComponent.propTypes = {
    doLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = function(dispatch) {
    return {
        doLogout: () => {
            dispatch(userActions.userLogout());
        }
    };
};

const DashboardPage = connect(
    undefined,
    mapDispatchToProps
)(DashboardComponent);


export default DashboardPage;
