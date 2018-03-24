import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

var configureStore = null;
var Root = null;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./env/prod/configureStore.js')
  Root = require('./env/prod/Root.js');
} else {
  configureStore = require('./env/dev/configureStore.js')
  Root = require('./env/dev/Root.js');
}

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);