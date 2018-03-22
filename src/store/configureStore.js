import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import DevTools from '../DevTools';

import createLogger from 'redux-logger'; //dev
const logger = createLogger(); //dev

const finalCreateStore = compose(
  applyMiddleware(logger, thunk),
  DevTools.instrument() //dev
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
