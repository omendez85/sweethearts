var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');

var webpackTask = function (gulp, config) {
  return function () {
    gulp.src('')
    .pipe(gulpWebpack( require('../../webpack.config.js'), webpack ))
    .pipe(gulp.dest(config.paths.dist.js));
  }
}

module.exports = webpackTask;
