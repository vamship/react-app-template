import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import { navigator } from '../routes';
import { userActions, assetListActions } from '../actions';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
              <div> <strong>Assets</strong> </div>
              <div>
                <div style={ { padding: 10 } }>
                    <RaisedButton label="Dashboard" onClick={ this.gotoDashboard } secondary={ true } />
                    <RaisedButton label="Refresh Assets" onClick={ this.props.fetchAssetList } secondary={ true } />
                </div>
              </div>
              <div>
                  <Table>
                    <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                      <TableRow>
                        <TableHeaderColumn>Asset Id</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn>Floormap</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={ false }>
                        { this.props.assetList.map((asset, index) => {
                            return (
                                <TableRow key={ index }>
                                    <TableRowColumn>{ asset.assetId }</TableRowColumn>
                                    <TableRowColumn>{ asset.name }</TableRowColumn>
                                    <TableRowColumn>{ asset.description }</TableRowColumn>
                                    <TableRowColumn>{ asset.floorMapId }</TableRowColumn>
                                </TableRow>
                            );
                        }) }
                    </TableBody>
                  </Table>
              </div>
            </div>
            );
    }
}

AssetComponent.propTypes = {
    doLogout: PropTypes.func.isRequired,
    fetchAssetList: PropTypes.func.isRequired,
    listUpdating: PropTypes.bool.isRequired,
    assetList: PropTypes.arrayOf(PropTypes.shape({
        assetId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        floorMapId: PropTypes.string.isRequired
    }).isRequired).isRequired
};

const mapStateToProps = function(state) {
    return {
        listUpdating: !!state.assetList.isUpdating,
        assetList: state.assetList.items
    };
};
const mapDispatchToProps = function(dispatch) {
    return {
        doLogout: () => {
            dispatch(userActions.logoutSubmit());
        },
        fetchAssetList: () => {
            dispatch(assetListActions.assetListFetch());
        }
    };
};

const AssetPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetComponent);


export default AssetPage;
