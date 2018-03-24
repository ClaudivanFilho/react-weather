import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        
          <div>
            <App />
            <DevTools />
          </div>
      </Provider>
    );
  }
};
