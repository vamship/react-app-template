'use strict';

import { Promise } from 'bluebird';
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { autoRehydrate, persistStore, createTransform } from 'redux-persist';
import rootReducer from './reducers';
import appSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
    collapsed: true
});

const userTransform = createTransform(
    (state) => {
        // Ensure that the loginError property is not persisted.
        return Object.assign({}, state, {
            loginError: ''
        });
    }
);

const storeReadyResolver = {
    resolve: () => {
        throw new Error('Store ready resolver not initialized!');
    },
    reject: () => {
        throw new Error('Store ready resolver not initialized!');
    }
};

export const storeReady = new Promise((resolve, reject) => {
    storeReadyResolver.resolve = resolve;
    storeReadyResolver.reject = reject;
});

export default function createStore(preloadedState) {
    const store = createReduxStore(
        rootReducer,
        preloadedState,
        compose(
            autoRehydrate(),
            applyMiddleware(
                sagaMiddleware,
                loggerMiddleware
            )
        )
    );
    persistStore(store, {
        // Only persist the user object.
        whitelist: ['user'],

        // Transform the user state when rehydrating
        transforms: [userTransform]
    }, (err, data) => {
        if (err) {
            return storeReadyResolver.reject(err);
        }
        storeReadyResolver.resolve(data);
    });
    sagaMiddleware.run(appSagas);
    return store;
}
