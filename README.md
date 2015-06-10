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

## CSS Regression Testing
CSS regression testing is possible through Phantomjs and the [grunt-phantomcss fork](https://github.com/anselmh/grunt-phantomcss). Specifiy your test cases inside the phantomcss.js file, you find in /css-regression-test. If you want to read more about this topic just follow the [link](http://www.phase2technology.com/blog/css-testing-with-phantomcss-phantomjs-casperjs-and-grunt/).

## Image Optimization
There are different image optimization tasks available:
* optimize-images — optimizes all images
* optimize-png — optimizes all images located in `dist/assets/images/png`
* optimize-jpg — optimizes all images located in `dist/assets/images/jpg`
* optimize-gif — optimizes all images located in `dist/assets/images/gif`

## Build Task
Type in `grunt build` and the task will build the website. It creates a new directory `dist` which contains the complete webpage, ready to ship.
The task runs the following "subtasks": 'sass:dev', 'clean', 'copy:dist', 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'filerev', 'usemin', 'optimize-images'.

### clean Task
Removes the `.tmp` and `dist` if it exists, to have a clean state.

### copy:dist Task
Copies the files to the `dist` folder. Usemin can now replace the paths there.

### useminPrepare
Generates the configuration for concat, cssmin, uglify. It goes through the *.html files and looks for the usemin-tags (<!-- build...-->).

### *:generated
Auto-generated tasks by usemin.

### filerev Task
Adds an hash to the filename. Now you have no caching problems anymore ;-)

### usemin Task
Replaces the file paths in the *.html, *.js, *.css files to the new ones.