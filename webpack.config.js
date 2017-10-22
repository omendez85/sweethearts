
const webpack = require('webpack');
const path = require('path');
const config = require('./gulp/config');
const webpackAliases = require('./webpack.aliases');

module.exports = {
  devtool: 'cheap-eval-source-map',
  target: 'web',

  entry: {
    bundle: config.paths.src.js + 'index.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: webpackAliases
  }
};
