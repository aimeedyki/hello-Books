const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './client/src/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'client/public/js'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, '/client/public')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '../css/style.css',
      allChunks: true
    })
  ],

  devServer: {
    historyApiFallback: true,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.jpeg$/,
        loader: 'file-loader'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
}
