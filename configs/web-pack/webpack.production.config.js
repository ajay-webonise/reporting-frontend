'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, '../..', './app')
];

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '../..', 'app/assets/javascript/index.js')
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css/, loader: 'style-loader!css-loader?name=assets/css/[name]-[hash].[ext]' },
      { test: /\.png|jpg|gif$/, loader: 'file-loader?name=assets/images/[name]-[hash].[ext]' },
      { test: /\.xlsx$/, loader: 'file-loader?name=assets/file/[name].[ext]' },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      { test: /\.(woff|woff2|svg|ttf|eot|ico)$/, loader: 'file-loader?name=assets/fonts/[name].[ext]' }
    ]
  },
  output: {
    filename: 'assets/javascript/[name]-[hash].js',
    path: path.join(__dirname, '../..', './build'),
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.template.html',
      inject: 'body',
      filename: 'index.html',
      favicon: path.join(__dirname, '../..', 'app', 'assets', 'images', 'favicon.ico')
    }),
    new ExtractTextPlugin('assets/stylesheet/[name]-[hash].min.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['app', 'node_modules']
  }
};
