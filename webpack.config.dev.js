const webpack = require('webpack'), path = require('path');

module.exports = {
  devtool: 'eval',
  /** JS with webpack hot middleware */
  entry: [
    'webpack-hot-middleware/client?reload=true', //allows full reload in case of hot reload failure
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  /** serve a virtual output file from `/` */
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  /** dev server config*/
  devServer: {
    contentBase: path.resolve(__dirname, 'src/js')
  },
  /** plugin hmr for hot reload and no emitting if error*/
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    /** all js file go through babel loader with preset react hmre in development environment*/
    loaders: [
      {
        test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader',
        query: {"presets": ["react", "es2015", "react-hmre"]}
      },
      {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};