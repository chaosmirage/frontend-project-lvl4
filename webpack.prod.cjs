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
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server',
    },
  },
};

module.exports = merge(common, config);
