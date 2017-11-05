'use strict';

const { resolve } = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './client'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
};
