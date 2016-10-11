import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import { userActions, navActions } from './actions';
import AppLayoutPage from './containers/app-layout-page';
import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';
import DashboardPage from './containers/dashboard-page';
import VideoPlayerPage from './containers/video-player-page';

const routes = (
<Route name="Home" path="/" component={ AppLayoutPage }>
  <IndexRoute component={ HomePage } />
  <Route component={ HomePage } />
  <Route name="Login" path="login" component={ LoginPage } />
  <Route
         name="Dashboard"
         path="dashboard"
         component={ DashboardPage }
         protected />
  <Route name="Video" path="video" component={ VideoPlayerPage } />
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
            const isTokenValid = (user.validUntil >= Date.now());
            if (route.protected && !isTokenValid) {
                const message = (user.authToken) ? 'Session expired' : '';
                store.dispatch(navActions.navRedirectSaved(path));
                store.dispatch(userActions.userSessionInvalidated(message));
                transition('/login');
            }
        };
    });
}
