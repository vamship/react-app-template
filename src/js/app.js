'use strict';

import { Promise } from 'bluebird';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';

import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../css/app.css';
import createRoutes from './routes';
import createStore, { storeReady } from './store';
import theme from './theme';
import AppRootComponent from './components/app-root-component';

injectTapEventPlugin();

const store = createStore();
const history = hashHistory; //TODO: Link this with a navigation helper.
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
