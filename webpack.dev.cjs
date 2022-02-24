const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

const config = {
  mode: 'development',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    filename: '[name].bundle.js',
  },
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/assets/',
    historyApiFallback: true,
  },
};

module.exports = merge(common, config);
