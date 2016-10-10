import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import { navigator } from '../routes';
import { userActions, assetListActions } from '../actions';


class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.gotoAssets = navigator.getNavAction('/dashboard/assets');
    }

    componentDidMount() {
        this.props.fetchAssetList();
    }

    render() {
        return (
            <div>
              <div>
                <strong>Dashboard</strong>
                <div>
                  <div style={ { padding: 10 } }>
                    <RaisedButton label="Assets" onClick={ this.gotoAssets } secondary={ true } />
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
    doLogout: PropTypes.func.isRequired,
    fetchAssetList: PropTypes.func.isRequired
};

const mapDispatchToProps = function(dispatch) {
    return {
        doLogout: () => {
            dispatch(userActions.userLogout());
        },
        fetchAssetList: () => {
            dispatch(assetListActions.assetListFetch());
        }
    };
};

const DashboardPage = connect(
    undefined,
    mapDispatchToProps
)(DashboardComponent);


export default DashboardPage;
