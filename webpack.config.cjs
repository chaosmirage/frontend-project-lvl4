// @ts-check

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

const mode = process.env.NODE_ENV || 'development';

const config = {
  mode: 'development',
  optimization: {
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
  entry: {
    index: './src/index.ts',
    makeApp: './src/app/index.tsx',
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    filename: '[name].bundle.js',
    libraryTarget: 'module',
  },
};

module.exports = merge(common, config);
