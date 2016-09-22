'use strict';

const _browserSync = require('browser-sync');
const _browserifyMiddleware = require('browserify-middleware');
const _url = require('url');

const _jsHandler = _browserifyMiddleware('./src/js/app.js', {
    transform: [ [
        'babelify', {
            presets: [ 'latest', 'react' ]
         }
    ], [
        'browserify-css', {
        }
    ] ]
});

function serveDynamicJs(req, res, next) {
    const components = _url.parse(req.url);
    if(components.pathname.match(/app\.js$/)) {
        return _jsHandler(req, res, next);
    }
    return next();
}

module.exports = {
    files: [ './src/**/*.{html,htm,css,js}' ],
    port: 3000,
    server: {
        baseDir: './src',
        middleware: {
            2: serveDynamicJs
        }
    }
};
