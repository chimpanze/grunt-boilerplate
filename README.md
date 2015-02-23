grunt-boilerplate
=================

This is my personal Grunt boilerplate. It contains a local server which will be accessible on localhost:1337, a simple watch task for Sass files and Uglify to compress and concatinate JS files.

Just git clone the repo and install everything with `npm install`.
Afterwards just type in `grunt`.


## Sass Task
This Grunt file includes two Sass tasks — one for development, one for production.

### sass:dev
The Sass dev task includes Source Maps and will output CSS in a nested (usual CSS style) way.

### sass:prod
Tha Sass prod task doesn't include Source Maps and will output CSS compressed.