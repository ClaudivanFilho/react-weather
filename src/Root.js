import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={ App }/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
};
