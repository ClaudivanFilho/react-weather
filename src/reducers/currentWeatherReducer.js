import { 
  START_FETCH_CURRENT_WEATHER,
  END_FETCH_CURRENT_WEATHER,
  ERROR_FETCH_CURRENT_WEATHER
} from '../constants/ActionTypes';

var initialState = {
  loading: false,
  weather: null
};

export default function currentWeather(state = initialState, action) {
  switch (action.type) {
    case START_FETCH_CURRENT_WEATHER:
      return Object.assign({}, state, {
        loading: true,
        weather: null
      });
    case END_FETCH_CURRENT_WEATHER:
      return Object.assign({}, state, {
        loading: false,
        weather: action.payload ? action.payload.weather : null
      });
    default:
      return state;
  }
    
}
