const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index.jsx'
  ],
  node: {
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    path: path.join(__dirname, 'client/public/js'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, '/client/public/')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '../css/style.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      CLIENT_ID: JSON.stringify('406108815512-6lu003ugn55vjhu1pg359lkpq8ih7o9t'
        + '.apps.googleusercontent.com'),
      CLOUDINARY_UPLOAD_URL: JSON.stringify('https://api.cloudinary.com'
        + '/v1_1/ddxsazo2k/image/upload'),
      CLOUDINARY_UPLOAD_PRESET: JSON.stringify('kqndqiq6')
    }),
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
};
