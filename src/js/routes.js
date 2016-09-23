import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import { navActions } from './actions';
import AppLayoutPage from './containers/app-layout-page';
import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';
import DashboardPage from './containers/dashboard-page';

const routes = (
<Route path="/" component={ AppLayoutPage }>
  <IndexRoute component={ HomePage } />
  <Route component={ HomePage } />
  <Route path="login" component={ LoginPage } />
  <Route path="dashboard" component={ DashboardPage } protected />
</Route>
);

function traverse(route, configureRoute) {
    configureRoute(route);

    if (route.childRoutes) {
        route.childRoutes.forEach((childRoute) => traverse(childRoute, configureRoute));
    }
    return route;
}

export const history = hashHistory;

export const navigator = {
    goto: function(url) {
        history.push(url);
    },
    goBack: function() {
        history.goBack();
    }
};

export default function createRoutes(store) {
    return traverse(Route.createRouteFromReactElement(routes), (route) => {
        //console.log(`Configuring route`, route);
        route.onEnter = (nextState, transition) => {
            const user = (store.getState()).user;
            const path = nextState.location.pathname;
            if (route.protected && !user.authToken) {
                console.warn(`Unauthenticated user attempting to access protected page: [${path}]`);
                store.dispatch(navActions.navSetRedirect(path));
                transition('/login');
            }
            const type = route.protected ? 'PRIVATE' : 'PUBLIC';
            console.log(`[${type}] Route entered: [${nextState.location.pathname}]`);
        };
    });
}
