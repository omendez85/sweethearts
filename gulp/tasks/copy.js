var copy = function (gulp, config) {
    return function () {
        gulp.src(config.paths.src.assets + '**/*.*')
            .pipe(gulp.dest(config.paths.dist.assets))
    }
}

module.exports = copy;
