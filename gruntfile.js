module.exports = function(grunt) {
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
        files: 'scss/**/*.scss',
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
          sourceMap: false, //set to true when the node.js bug is fixed
          outputStyle: 'nested'
        },
        files: {
          'css/style.css' : 'scss/style.scss'
        }
      },
      prod: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'css/prod/style.css' : 'scss/style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default',[ 'connect', 'watch']);
};