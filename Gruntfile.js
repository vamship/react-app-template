'use strict';

var _folder = require('wysknd-lib').folder;

module.exports = function(grunt) {
    /* ------------------------------------------------------------------------
     * Initialization of dependencies.
     * ---------------------------------------------------------------------- */
    //Time the grunt process, so that we can understand time consumed per task.
    require('time-grunt')(grunt);

    //Load all grunt tasks by reading package.json.
    require('load-grunt-tasks')(grunt);

    /* ------------------------------------------------------------------------
     * Build configuration parameters
     * ---------------------------------------------------------------------- */
    var packageConfig = grunt.file.readJSON('package.json') || {};

    var PRJ_FS = {
        appName: packageConfig.name || '__UNKNOWN__',
        appVersion: packageConfig.version || '__UNKNOWN__',
        tree: {                             /* ------------------------------ */
                                            /* <ROOT>                         */
            'src': {                        /*  |--- src                      */
                'css': null,                /*  |   |--- css                  */
                'js': null,                 /*  |   |--- js                   */
                'img': null                 /*  |   |--- img                  */
            },                              /*  |                             */
            'working': {                    /*  |--- working                  */
                'css': null,                /*  |   |--- css                  */
                'js': null,                 /*  |   |--- js                   */
                'img': null                 /*  |   |--- img                  */
            },                              /*  |                             */
            'dist': null                    /*  |--- dist                     */
        }                                   /* ------------------------------ */
    };

    PRJ_FS.ROOT = _folder.createFolderTree('./', PRJ_FS.tree);

    (function _createTreeRefs(parent, subTree) {
        for(var folder in subTree) {
            var folderName = folder.replace('.', '_');
            parent[folderName] = parent.getSubFolder(folder);

            var children = subTree[folder];
            if(typeof children === 'object') {
                _createTreeRefs(parent[folder], children);
            }
        }
    })(PRJ_FS.ROOT, PRJ_FS.tree);

    // Shorthand references to key folders.
    var ROOT = PRJ_FS.ROOT;
    var SRC = PRJ_FS.ROOT.src;
    var WORKING = PRJ_FS.ROOT.working;
    var DIST = PRJ_FS.ROOT.dist;

    /* ------------------------------------------------------------------------
     * Grunt task configuration
     * ---------------------------------------------------------------------- */
    grunt.initConfig({
        /**
         * Configuration for grunt-contrib-copy, which is used to:
         *  - Copy files to a distribution folder during build.
         */
        copy: {
            compile: {
                files: [ {
                    expand: true,
                    cwd: SRC.getPath(),
                    src: ['index.html'],
                    dest: WORKING.getPath()
                } ]
            }
        },

        /**
         * Configuration for grunt-contrib-clean, which is used to:
         *  - Remove temporary files and folders.
         */
        clean: {
            dist: [ DIST.getPath() ],
            working: [ WORKING.getPath() ]
        },

        /**
         * Configuration for grunt-eslint, which is used to:
         *  - Lint source and test files.
         */
        eslint: {
            dev: [ SRC.js.allFilesPattern('js') ]
        },

        /**
         * Configuration for grunt-esformatter, which is used to:
         *  - Format javascript source code
         */
        esformatter: {
            src: [ SRC.js.allFilesPattern('js') ]
        },

        /**
         * Configuration for grunt-browserify, which is used to:
         *  - Combine all CommonJS modules for the browser into a single
         *    javascript file.
         */
        browserify: {
            compile: {
                options: {
                    transform: [ [
                        'babelify', {
                             presets: [ 'latest', 'react' ]
                        }
                    ], [
                        'browserify-css', {
                        }
                    ] ]
                },
                src: SRC.js.getChildPath('app.js'),
                dest: WORKING.js.getChildPath('app.js')
            }
        },

        /**
         * Configuration for grunt-contrib-uglify, which is used to:
         *  - Minify javascript files for production deployments.
         */
        uglify: {
            options: {
            },
            default: {
                files: [{
                    cwd: ROOT.getPath(),
                    src: WORKING.js.getChildPath('app.js'),
                    dest: WORKING.js.getChildPath('app.js')
                }]
            }
        },

        /**
         * Configuration for grunt-contrib-watch, which is used to:
         *  - Monitor all source/test files and trigger actions when these
         *    files change.
         */
        watch: {
            allSources: {
                files: [ SRC.allFilesPattern() ],
                tasks: [ ]
            }
        }
    });

    /* ------------------------------------------------------------------------
     * Task registrations
     * ---------------------------------------------------------------------- */
    /**
     * Default task. Performs default tasks prior to commit/push, including:
     *  - Building sources
     */
    grunt.registerTask('default', [ 'build' ]);

    /**
     * Default task. Performs default tasks prior to commit/push, including:
     *  - Building sources
     */
    grunt.registerTask('build', [ 'clean',
                                    'esformatter',
                                    'eslint:dev',
                                    'copy:compile',
                                    'browserify:compile' ]);

    /**
     * Monitor task - track changes on different sources, and triggers a rebuild
     * of sources if any changes are detected.
     */
    grunt.registerTask('monitor',
        'Monitors source files for changes, and performs actions as necessary',
        function() {
            var tasks = [];

            for (var index = 0; index < arguments.length; index++) {
                var arg = arguments[index];
                var task = null;

                switch(arg) {
                    case 'lint':
                        tasks.push('eslint:dev');
                        break;
                    case 'build':
                        tasks.push('build');
                        break;
                }
            }

            grunt.log.writeln('Tasks to run on change: [' + tasks + ']');
            if(tasks.length > 0) {
                grunt.config.set('watch.allSources.tasks', tasks);
                grunt.task.run('watch:allSources');
            } else {
                grunt.log.error('No tasks specified to execute on change');
            }
        }
    );

    /**
     * Lint task - checks source and test files for linting errors.
     */
    grunt.registerTask('lint', [ 'eslint:dev' ]);

    /**
     * Formatter task - formats all source and test files.
     */
    grunt.registerTask('format', [ 'esformatter' ]);

};
