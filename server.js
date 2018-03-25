const path = require('path');
const express = require('express');
const webpack = require('webpack');
const graphqlHTTP = require('express-graphql');

const app = express();

var http = require('http').Server(app);
app.set('port', (process.env.PORT || 3000));

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

http.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Node app is running on port', app.get('port'));
});
