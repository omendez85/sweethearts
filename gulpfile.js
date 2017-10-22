var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('./gulp/config');
var twig = require('gulp-twig');

gulp.task('styles', require('./gulp/tasks/scss').styles(gulp, config));

gulp.task('stylesMin', require('./gulp/tasks/scss').stylesMin(gulp, config));

gulp.task('server', require('./gulp/tasks/server').server(gulp, connect, config));

gulp.task('reloadSite', require('./gulp/tasks/server').reloadSite(gulp, connect, config));

gulp.task('webpack', require('./gulp/tasks/webpack')(gulp, config));

gulp.task('twig', function () {
    return gulp.src( config.paths.src.main + '**/*.twig' )
        .pipe(twig())
        .pipe(gulp.dest( config.paths.app ));
});

gulp.task('copy', require('./gulp/tasks/copy')(gulp, config));

gulp.task('watch', function () {
    gulp.watch( config.paths.src.scss + '**/*.scss', ['styles']);
    gulp.watch( config.paths.src.main + '**/*.{js,jsx}', ['webpack']);
    gulp.watch( config.paths.app + '**/*.*', ['reloadSite']);
    gulp.watch( config.paths.src.main + '**/*.twig', ['twig', 'reloadSite']);
    gulp.watch( config.paths.src.assets + '**/*.*', ['copy', 'reloadSite']);
});

gulp.task('build:prod', ['copy', 'twig', 'styles', 'webpack']);

gulp.task('default', ['copy', 'twig', 'styles', 'webpack', 'server', 'watch']);
