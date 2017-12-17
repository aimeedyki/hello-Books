const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  },
  CLIENT_ID: JSON.stringify('406108815512-6lu003ugn55vjhu1pg359lkpq8ih7o9t'
    + '.apps.googleusercontent.com'),
  CLOUDINARY_UPLOAD_URL: JSON.stringify('https://api.cloudinary.com'
    + '/v1_1/ddxsazo2k/image/upload'),
  CLOUDINARY_UPLOAD_PRESET: JSON.stringify('kqndqiq6')
};

module.exports = {
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    quiet: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin({
      filename: '../css/style.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
  ],

  module: {
    loaders: [
      /** ADDING/UPDATING LOADERS 
       The "file" loader handles all assets unless explicitly excluded.
       The `exclude` list *must* be updated with every change
       to loader extensions.
       When adding a new loader, you must add its `test`
       as a new entry in the `exclude` list for "file" loader.

       "file" loader makes sure those assets get served by WebpackDevServer.
       When you `import` an asset, you get its (virtual) filename.
       In production, they would get copied to the `build` folder. */
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.sass$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'bundle.[ext]',
        },
      },
      /* "url" loader works like "file" loader except that it embeds assets
         smaller than specified limit in bytes as data URLs to avoid requests.
         A missing `test` is equivalent to a match. */
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000
        },
      },
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
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
