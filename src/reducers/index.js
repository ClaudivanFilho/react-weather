import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import forecast from './forecastReducer';

/**
 * combineReducers. This helper
 * function from 'redux' simply merges the reducers.
 */
const rootReducer = combineReducers({
  currentWeather, forecast
});

export default rootReducer;
