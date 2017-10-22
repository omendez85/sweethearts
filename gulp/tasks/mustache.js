var gulpMustache = require('gulp-mustache');
var rename = require('gulp-rename');

var mustache = function (gulp, config) {
  return function () {
    gulp.src( config.paths.src.main + '**/*.mustache' )
      .pipe(gulpMustache())
      .pipe(rename(function (path) {
        path.extname = '.html'
      }))
      .pipe(gulp.dest( config.paths.app ));
  }
}

module.exports = mustache;
