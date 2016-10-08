import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import { loginActions, navActions } from './actions';
import AppLayoutPage from './containers/app-layout-page';
import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';
import DashboardPage from './containers/dashboard-page';
import AssetPage from './containers/asset-page';
import VideoPlayerPage from './containers/video-player-page';

const routes = (
<Route path="/" component={ AppLayoutPage }>
  <IndexRoute component={ HomePage } />
  <Route component={ HomePage } />
  <Route path="login" component={ LoginPage } />
  <Route path="dashboard" component={ DashboardPage } protected>
    <Route path="assets" component={ AssetPage } />
  </Route>
  <Route path="video" component={ VideoPlayerPage } />
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
    getNavAction: function(url) {
        return () => {
            navigator.goto(url);
        }
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
            const isTokenValid = (user.tokenValidUntil >= Date.now());
            if (route.protected && !isTokenValid) {
                const message = (user.authToken) ? 'Session expired' : '';
                store.dispatch(navActions.navSetRedirect(path));
                store.dispatch(loginActions.loginRequest(message));
                transition('/login');
            }
        };
    });
}
