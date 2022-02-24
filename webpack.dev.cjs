const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

const config = {
  mode: 'development',
  entry: './src/index.ts',
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/assets/',
    historyApiFallback: true,
  },
};

module.exports = merge(common, config);
