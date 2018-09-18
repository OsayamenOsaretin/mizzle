// Set up express
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import userRoutes from './routes/users';

require('dotenv').config();

const app = express();

// configure port
const port = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const environment = process.env.NODE_ENV;
if (environment !== 'production') {
  const config = require('../build/webpack.base.conf.js');    // eslint-disable-line
  const compiler = webpack(config);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: false,
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use('/', userRoutes);


app.listen(port, () => {
  console.log('we are listening');
});
module.exports = app;
