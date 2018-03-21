import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';

/**
 * combineReducers. This helper
 * function from 'redux' simply merges the reducers.
 */
const rootReducer = combineReducers({
  currentWeather,
});

export default rootReducer;
