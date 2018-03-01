// @flow

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  context: path.resolve(__dirname, 'docs'),
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
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
    new webpack.DefinePlugin({
      // $FlowFixMe: This definitely exists here.
      'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
      // $FlowFixMe: This definitely exists here.
      'process.env.CLIENT_SECRET': `'${process.env.CLIENT_SECRET}'`,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'docs/index.html'),
    }),
    new CopyWebpackPlugin(['_redirects', 'favicon.ico', 'App/index.css']),
  ],
};
