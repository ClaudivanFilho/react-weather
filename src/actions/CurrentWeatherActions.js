import { 
  START_FETCH_CURRENT_WEATHER, 
  END_FETCH_CURRENT_WEATHER ,
  REQUEST_ERROR
} from '../constants/ActionTypes';

import { GRAPH_URI } from '../constants/Global';

import { getOpenWeatherQuery } from '../graphql/queries';

const apolloFetch = require('apollo-fetch').createApolloFetch({ uri: GRAPH_URI });
const CURRENT_WEATHER_ATTRS = `lat, lon, temp, temp_min, temp_max, main, description, name, country, sunrise, sunset, humidity, icon, wind`;

export function fetch(city, lat, lon) {
  return dispatch => {

    dispatch({type: START_FETCH_CURRENT_WEATHER});

    let query = getOpenWeatherQuery({city, lat, lon}, 'weather', CURRENT_WEATHER_ATTRS);

    return apolloFetch({
      query: query,
    }).then(res => {
      if (res.errors) {
        console.log(res.errors)
        dispatch({type: END_FETCH_CURRENT_WEATHER});  
        return null;
      } else {
        dispatch({type: END_FETCH_CURRENT_WEATHER, payload: res.data});
        return res.data;
      }
    }, err => {
      dispatch({type: END_FETCH_CURRENT_WEATHER});
      dispatch({type: REQUEST_ERROR, payload: err});
      return err.errors;
    });
  }
}

export function error(error) {
  return dispatch => {
    dispatch({type: END_FETCH_CURRENT_WEATHER});
    dispatch({type: REQUEST_ERROR, payload: error});
  }
}
