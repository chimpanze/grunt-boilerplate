var mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {

    'use strict';

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 1337
                }
            }
        },

        watch: {
            css: {
                files: 'assets/scss/**/*.scss',
                tasks: ['sass:dev'],
                options: {
                    atBegin: true,
                    interrupt: true,
                    spawn: true,
                    livereload: true
                }
            }
        },

        sass: {
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'nested'
                },
                files: {
                    'assets/dev/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        phantomcss: {
            options: {mismatchTolerance: 0.05},

            viewportSmall: {
                options: {
                    screenshots: 'css-regression-tests/viewportSmall/baselines',
                    results: 'css-regression-tests/viewportSmall/results',
                    viewportSize: [375, 667]
                },
                src: ['css-regression-tests/phantomcss.js']
            },
            // viewportMiddle: {},
            // viewportLarge: {}
        },

        imagemin: {
            options: {
                optimizationLevel: 3,
                progressive: true,
                interlaced: true,
                use: [mozjpeg()]
            },
            png: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/',
                    src: ['images/png/**/*.png'],
                    dest: 'dist/assets/'
                }]
            },
            jpg: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/',
                    src: ['images/jpg/**/*.jpg'],
                    dest: 'dist/assets/',
                }]
            },
            gif: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/',
                    src: ['images/gif/**/*.gif'],
                    dest: 'dist/assets/'
                }]
            }
        },

        useminPrepare: {
            html: '*.html',
            options: {
                dest: 'dist',
                assetsDirs: ['assets/css', 'assets/js', 'assets/images'],
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ],
                    css: [
                        [/(?:src=|url\(\s*)['"]?([^'"\)\?#]+)['"]?\s*\)?/gm, 'Update the CSS to reference our revved images']
                    ]
                }
            }
        },

        usemin: {
            html: ['dist/*.html'],
            css: ['dist/assets/css/{,*/}*.css'],
            js: 'dist/assets/js/{,*/}*.js'
        },

        filerev: {
            dist: {
                files: [{
                    src: [
                        'dist/assets/js/{,*/}*.js',
                        'dist/assets/css/{,*/}*.css',
                        'dist/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        'dist/assets/fonts/(,*/}*.{eot,svg,ttf,woff}'
                    ]
                }]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        src: '*.html',
                        dest: 'dist/'
                    },
                    {
                        src: 'assets/images/**',
                        dest: 'dist/',
                        expand: true
                    },
                    {
                        src: './index.html',
                        dest: 'dist/index.html'
                    }
                ]
            }
        },

        clean: ["dist/", ".tmp/"]
    });

    //TODO: usemin, image optimization,
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phantomcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass:dev',
        'clean',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin',
        'optimize-images'
    ]);

    grunt.registerTask('regression-test', [
        'connect',
        'phantomcss'
    ]);

    grunt.registerTask('optimize-images', [
        'imagemin'
    ]);

    grunt.registerTask('optimize-png', [
        'imagemin:png'
    ]);

    grunt.registerTask('optimize-jpg', [
        'imagemin:jpg'
    ]);

    grunt.registerTask('optimize-gif', [
        'imagemin:gif'
    ]);
};