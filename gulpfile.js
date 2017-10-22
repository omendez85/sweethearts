var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./gulp/config');

gulp.task('styles', require('./gulp/tasks/scss').styles(gulp, config));
gulp.task('stylesMin', require('./gulp/tasks/scss').stylesMin(gulp, config));

gulp.task('server', require('./gulp/tasks/server').server(gulp, connect, config));

gulp.task('reloadSite', require('./gulp/tasks/server').reloadSite(gulp, connect, config));

gulp.task('webpack', require('./gulp/tasks/webpack')(gulp, config));

gulp.task('mustache', require('./gulp/tasks/mustache')(gulp, config));

gulp.task('copy', require('./gulp/tasks/copy')(gulp, config));

gulp.task('watch', function () {
    gulp.watch( config.paths.src.scss + '**/*.scss', ['styles']);
    gulp.watch( config.paths.src.main + '**/*.{js,jsx}', ['webpack']);
    gulp.watch( config.paths.app + '**/*.*', ['reloadSite']);
    gulp.watch( config.paths.src.main + '*.mustache', ['mustache']);
    gulp.watch( config.paths.src.assets + '**/*.*', ['copy', 'reloadSite']);
});

gulp.task('build:prod', ['copy', 'mustache', 'styles', 'webpack']);

gulp.task('default', ['copy', 'mustache', 'styles', 'webpack', 'server', 'watch']);
