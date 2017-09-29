const express = require('express'), webpack = require('webpack'), path = require('path');
const config = require('./webpack.config.dev'), compression = require('compression');

const port = process.env.port || 8080;
const ip = '0.0.0.0';
const app = express();

if (process.env.NODE_ENV === 'production') {
  /** use compression in production*/
  app.use(compression());
  /** serve static files in dist using express*/
  app.use(express.static('dist'));
  /** make all requests send index.html*/
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} else {
  const compiler = webpack(config);
  /** use webpack dev server with node to serve files*/
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  /** use webpack hot middleware for hot reloading*/
  app.use(require('webpack-hot-middleware')(compiler));
  /** make all requests send index.html*/
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });
}
/** listen to given port and ip*/
app.listen(port, ip);