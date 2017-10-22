var history = require('connect-history-api-fallback');

var server = function (gulp, connect, config) {
  return function () {
    connect.server({
      host: config.server.host,
      port: config.server.port,
      root: config.server.path,
      livereload: true,
      middleware: function(connect, opt) {
        return [
          history({})
        ]
      }
    });
  }
}

var reloadSite = function (gulp, connect, config) {
  return function () {
    gulp.task('reloadSite', function(){
      gulp.src(config.paths.app + '**/*.*')
      .pipe(connect.reload());
    });
  }
}

module.exports.server = server;
module.exports.reloadSite = reloadSite;
