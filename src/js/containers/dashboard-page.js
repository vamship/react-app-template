'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { loginActions } from '../actions';

const DashboardComponent = ({doLogout}) => {
    return (
        <div>
          <div>
            <strong>Dashboard</strong>
            <button onClick={ (e) => {
                                  doLogout()
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
            dispatch(loginActions.logoutRequest());
        }
    };
};

const DashboardPage = connect(
    undefined,
    mapDispatchToProps
)(DashboardComponent);


export default DashboardPage;
