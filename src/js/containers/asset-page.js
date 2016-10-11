import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userActions, assetListActions, cameraListActions } from '../actions';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress';

import { navigator } from '../routes';
import * as styles from '../styles/element-styles';

class AssetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.gotoDashboard = navigator.getNavAction('/dashboard');
    }

    componentDidMount() {
        this.props.fetchAssetList();
    }

    render() {
        return (
            <div>
              <div>
                <strong>Assets</strong>
              </div>
              <div>
                <div style={ { padding: 10 } }>
                  <RaisedButton label="Dashboard" onClick={ this.gotoDashboard } secondary={ true } />
                  <RaisedButton label="Refresh Assets" onClick={ this.props.fetchAssetList } secondary={ true } />
                  <RaisedButton label="Refresh Cameras" onClick={ this.props.fetchCameraList } secondary={ true } />
                </div>
              </div>
              <div>
                { this.props.isUpdating &&
                  <LinearProgress mode="indeterminate" /> }
                { <Table onCellClick={ (row, cell) => {
                                           console.log('Item clicked: ', this.props.assetList[row]);
                                       } }>
                    <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                      <TableRow>
                        <TableHeaderColumn>
                          Name
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          Cameras
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                          Description
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={ false }>
                      { this.props.assetList.map((asset, index) => {
                            return (
                                <TableRow key={ index }>
                                  <TableRowColumn>
                                    { asset.name }
                                  </TableRowColumn>
                                  <TableRowColumn>
                                    { asset.cameras.length }
                                  </TableRowColumn>
                                  <TableRowColumn>
                                    { asset.description }
                                  </TableRowColumn>
                                </TableRow>
                                );
                        }) }
                    </TableBody>
                  </Table> }
              </div>
            </div>
            );
    }
}

AssetComponent.propTypes = {
    doLogout: PropTypes.func.isRequired,
    fetchAssetList: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    assetList: PropTypes.arrayOf(PropTypes.shape({
        assetId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        cameras: PropTypes.arrayOf(PropTypes.shape({
            cameraId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired).isRequired
    }).isRequired).isRequired
};

function _linkCamerasToAssets(assets, cameras) {
    const assetMap = { };
    const linkedAssets = [];
    assets.forEach((assetRecord) => {
        const {assetId, name, description} = assetRecord;
        const asset = Object.assign({}, {
            assetId,
            name,
            description,
            cameras: []
        });
        assetMap[assetRecord.assetId] = asset;
        linkedAssets.push(asset);
    });
    cameras.forEach((cameraRecord) => {
        const {cameraId, assetId, name, description} = cameraRecord;
        const asset = assetMap[assetId];
        if (asset) {
            asset.cameras.push(Object.assign({}, {
                cameraId,
                name,
                description
            }));
        }
    });
    return linkedAssets;
}

const mapStateToProps = function(state) {
    return {
        isUpdating: !!state.assetList.isUpdating,
        assetList: _linkCamerasToAssets(state.assetList.items, state.cameraList.items)
    };
};
const mapDispatchToProps = function(dispatch) {
    return {
        doLogout: () => {
            dispatch(userActions.logoutSubmit());
        },
        fetchAssetList: () => {
            dispatch(assetListActions.assetListFetch());
        },
        fetchCameraList: () => {
            dispatch(cameraListActions.cameraListFetch());
        }
    };
};

const AssetPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetComponent);


export default AssetPage;
