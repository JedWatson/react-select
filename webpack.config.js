// @flow

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'examples'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  resolve: {
    alias: {
      'react-select': path.resolve(__dirname, 'src/index'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/index.html'),
    }),
    new CopyWebpackPlugin(['_redirects', 'favicon.ico', 'index.css']),
  ],
};
