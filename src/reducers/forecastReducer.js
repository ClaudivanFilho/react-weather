import { 
  START_FETCH_FORECAST,
  END_FETCH_FORECAST,
  ERROR_FETCH_FORECAST
} from '../constants/ActionTypes';

var initialState = {
  loading: false,
  forecast: null
};

export default function forecast(state = initialState, action) {
  switch (action.type) {
    case START_FETCH_FORECAST:
      return Object.assign({}, state, {
        loading: true,
        forecast: null
      });
    case END_FETCH_FORECAST:
      return Object.assign({}, state, {
        loading: false,
        forecast: action.payload ? action.payload.forecast : null
      });
    default:
      return state;
  }
    
}
