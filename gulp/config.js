'use-strict';

module.exports = {
    api: {
        menu: './src/api/lang.json'
    },
    paths: {
        app: './public/',
        src: {
            main: './src/',
            assets: './src/assets/',
            scss: './src/sass/',
            js: './src/js/'
        },
        dist: {
            css: './public/css',
            js: './public/js',
            assets: './public/assets'
        }
    },
    server: {
        port: 8080,
        host: 'localhost',
        path: 'public'
    }
};
