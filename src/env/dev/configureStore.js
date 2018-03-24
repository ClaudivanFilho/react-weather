import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import DevTools from './DevTools';

import createLogger from 'redux-logger';
const logger = createLogger();

const finalCreateStore = compose(
  applyMiddleware(logger, thunk),
  DevTools.instrument()
)(createStore);

module.exports = function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
