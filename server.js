const path = require('path');
const express = require('express');
const webpack = require('webpack');
const graphqlHTTP = require('express-graphql');

const app = express();

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;

if (process.env.NODE_ENV == 'development') {
  // === Development Mode ==============
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));  
  app.use(require('webpack-hot-middleware')(compiler));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  // === Production Mode ==============
  app.use(express.static('dist'))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

// Start a graphql resource linked to the api of OpenWeather
const schema = require('./schema');
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true  
}))

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
