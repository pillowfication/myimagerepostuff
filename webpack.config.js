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
      {test: /\.jsx?$/, loader: 'babel'},
      {test: /\.scss$/, loader: 'style!css!sass'},

      {test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'},
      {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'},
      {test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'},
      {test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'},
      {test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'}
    ]
  }
};
