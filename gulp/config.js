'use-strict';

module.exports = {
    api: {
        menu: './src/api/lang.json'
    },
    paths: {
        app: './docs/',
        src: {
            main: './src/',
            assets: './src/assets/',
            scss: './src/sass/',
            js: './src/js/'
        },
        dist: {
            css: './docs/css',
            js: './docs/js',
            assets: './docs/assets'
        }
    },
    server: {
        port: 8080,
        host: 'localhost',
        path: 'docs'
    }
};
