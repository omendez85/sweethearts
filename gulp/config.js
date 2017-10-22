'use-strict';

module.exports = {
    api: {
        menu: './src/api/lang.json'
    },
    paths: {
        app: './dist/',
        src: {
            main: './src/',
            assets: './src/assets/',
            scss: './src/sass/',
            js: './src/js/'
        },
        dist: {
            css: './dist/css',
            js: './dist/js',
            assets: './dist/assets'
        }
    },
    server: {
        port: 8080,
        host: 'localhost',
        path: 'dist'
    }
};
