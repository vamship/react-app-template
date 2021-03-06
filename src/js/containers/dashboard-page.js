import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { userActions } from '../actions';

const DashboardComponent = ({doLogout}) => {
    return (
        <div>
          <div>
            <strong>Dashboard</strong>
            <button onClick={ () => {
                                  doLogout();
                              } }>
              Logout
            </button>
          </div>
        </div>
        );
};

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
