import { 
  START_FETCH_FORECAST, 
  END_FETCH_FORECAST ,
  REQUEST_ERROR
} from '../constants/ActionTypes';

import { GRAPH_URI } from '../constants/Global';

import { getOpenWeatherQuery } from '../graphql/queries';

const apolloFetch = require('apollo-fetch').createApolloFetch({ uri: GRAPH_URI });
const FORECAST_ATTRS = `lat, lon, name, country, list {
  icon, info, date, temp, temp_min, temp_max
}`

export function fetch(city, lat, lon) {
  return dispatch => {

    dispatch({type: START_FETCH_FORECAST});

    let query = getOpenWeatherQuery({city, lat, lon}, 'forecast', FORECAST_ATTRS);

    return apolloFetch({
      query: query,
    }).then(res => {
      dispatch({type: END_FETCH_FORECAST, payload: res.data});
      return res.data;
    }, err => {
      dispatch({type: END_FETCH_FORECAST});
      dispatch({type: REQUEST_ERROR, payload: err});
      return err.errors;
    });
  }
}

export function error(error) {
  return dispatch => {
    dispatch({type: END_FETCH_FORECAST});
    dispatch({type: REQUEST_ERROR, payload: error});
  }
}
