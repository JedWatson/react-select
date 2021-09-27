import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { config } from 'dotenv';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

config();

const webpackConfig: webpack.Configuration = {
  context: __dirname,
  entry: {
    index: './index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              root: path.join(__dirname, '..'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
    //   'process.env.CLIENT_SECRET': `'${process.env.CLIENT_SECRET}'`,
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CopyWebpackPlugin([
      '_redirects',
      'favicon.ico',
      'index.css',
      'magical-types/*',
    ]),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: './tsconfig.json',
      },
    }),
  ],
};

export default webpackConfig;
