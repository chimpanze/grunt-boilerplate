Grunt Boilerplate
=================

This is my personal Grunt boilerplate. It contains a local server which will be accessible on localhost:1337, a simple watch task for Sass files, Uglify to compress and concatinate JS files and the scaffold for implementing CSS regression tests.

Just git clone the repo and install everything with `npm install`.
Afterwards just type in `grunt`.

## Local Server
Grunt-connect brings up a simple local server (localhost:1337) without any fancy additions.

## Watch Task
Currently the grunt-watch task observes all `.scss` files inside the `assets/dev/scss/` folder(and included sub folders).

## Sass Tasks
This Grunt file includes two Sass tasks — one for development, one for production.

### sass:dev
The Sass dev task includes Source Maps and will output CSS in a nested (usual CSS style) way.

### sass:prod
The Sass prod task doesn't include Source Maps and will output CSS compressed.

## Uglify
Uglify smashes all JavaScript files inside the `assets/dev/js` folder (and included subfolders) together, minifies and puts them into the production folder.

## CSS Regression Testing
CSS regression testing is possible through Phantomjs and the [grunt-phantomcss fork](https://github.com/anselmh/grunt-phantomcss). Specifiy your test cases inside the phantomcss.js file, you find in /css-regression-test. If you want to read more about this topic just follow the [link](http://www.phase2technology.com/blog/css-testing-with-phantomcss-phantomjs-casperjs-and-grunt/).

## Image Optimization
There are different image optimization tasks available:
* optimize-images — optimizes all images
* optimize-png — optimizes all images located in `assets/dev/images/png`
* optimize-jpg — optimizes all images located in `assets/dev/images/jpg`
* optimize-gif — optimizes all images located in `assets/dev/images/gif`
