'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppLayoutPage from './containers/app-layout-page';
import HomePage from './containers/home-page';
import LoginPage from './containers/login-page';

const routes = (
<Route path="/" component={ AppLayoutPage }>
  <IndexRoute component={ HomePage } />
  <Route component={ HomePage } />
  <Route path="login" component={ LoginPage } />
  <Route path="dashboard" component={ LoginPage } />
</Route>
);

function traverse(route, configureRoute) {
    configureRoute(route);

    if (route.childRoutes) {
        route.childRoutes.forEach((childRoute) => traverse(childRoute, configureRoute));
    }

    return route;
}

export default function createRoutes(store) {
    return traverse(Route.createRouteFromReactElement(routes), (route) => {
        //console.log(`Configuring route`, route);
        route.onEnter = (nextState, transition) => {
            const user = (store.getState()).user;
            const path = nextState.location.pathname;
            if (route.protected && !user.authToken) {
                transition('/login');
                console.warn(`Unauthenticated user attempting to access protected page: [${path}]`);
            }
            const type = route.protected ? 'PRIVATE' : 'PUBLIC';
            console.log(`[${type}] Route entered: [${nextState.location.pathname}]`);
        };
    });
}
