var mozjpeg = require('imagemin-mozjpeg');

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

    watch: {
      css: {
        files: 'assets/dev/scss/**/*.scss',
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
          'assets/dev/css/style.css' : 'assets/dev/scss/style.scss'
        }
      },
      prod: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'assets/prod/css/style.css' : 'assets/dev/scss/style.scss'
        }
      }
    },

    uglify: {
      my_targets: {
        files: {
          'assets/prod/js/minified.js': ['assets/dev/js/*.js']
        }
      }
    },

    phantomcss: {
      options: { mismatchTolerance: 0.05 },

      viewportSmall: {
        options: {
          screenshots: 'css-regression-tests/viewportSmall/baselines',
          results: 'css-regression-tests/viewportSmall/results',
          viewportSize: [375, 667]
        },
        src: [ 'css-regression-tests/phantomcss.js' ]
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
          cwd: 'assets/dev/',
          src: ['images/png/**/*.png'],
          dest: 'assets/prod/'
        }]
      },
      jpg: {
        files: [{
          expand: true,
          cwd: 'assets/dev/',
          src: ['images/jpg/**/*.jpg'],
          dest: 'assets/prod/',
        }]
      },
      gif: {
        files: [{
          expand: true,
          cwd: 'assets/dev/',
          src: ['images/gif/**/*.gif'],
          dest: 'assets/prod/'
        }]
      }
    }
  });

  //TODO: usemin, image optimization,
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-phantomcss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default',[
    'connect',
    'watch'
  ]);

  grunt.registerTask('build',[
    'uglify',
    'sass:prod'
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