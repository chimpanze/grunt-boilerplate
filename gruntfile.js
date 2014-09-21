module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 1337,
          //keepalive: true
        }
      }
    },
    watch: {
      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],
        options: {
          atBegin: true,
          interrupt: true,
          spawn: false,
          livereload: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'nested'
      },
      dist: {
        files: {
          'css/style.css' : 'scss/style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default',[ 'connect', 'watch']);
};