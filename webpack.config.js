const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/website/index.jsx'),
  output: {
    path: path.join(__dirname, '/website'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel'
      }
    ]
  }
};
