module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 1337,
        }
      }
    },
    watch: { //rethink this task
      css: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass:dev'],
        options: {
          atBegin: true,
          interrupt: true,
          spawn: false,
          livereload: true
        }
      }
    },
    sass: {
      dev: {
        options: {
          sourceMap: true, //maybe an upadate is necessary
          outputStyle: 'nested'
        },
        files: {
          'assets/css/style.css' : 'assets/scss/style.scss'
        }
      },
      prod: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'assets/css/prod/style.css' : 'assets/scss/style.scss'
        }
      }
    }
  });
  // cssmin, uglify, usemin, image optimization,
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default',[
    'connect',
    'watch'
  ]);
};