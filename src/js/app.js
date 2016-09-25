import { Promise } from 'bluebird';
import React from 'react';
import { render } from 'react-dom';

import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../css/app.css';
import createRoutes, { history } from './routes';
import createStore, { storeReady } from './store';
import theme from './styles/theme';
import AppRootComponent from './components/app-root-component';

injectTapEventPlugin();

const store = createStore();
const routes = createRoutes(store, true);
const readyToRender = Promise.all([storeReady]);

render(
    <AppRootComponent
                      history={ history }
                      theme={ theme }
                      routes={ routes }
                      readyToRender={ readyToRender }
                      store={ store } />,
    document.getElementById('appRoot')
);
