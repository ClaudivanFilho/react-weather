import { 
  START_FETCH_CURRENT_WEATHER, 
  END_FETCH_CURRENT_WEATHER ,
  REQUEST_ERROR
} from '../constants/ActionTypes';

import { GRAPH_URI } from '../constants/Global';

import { getCurrentWeatherQuery } from '../graphql/queries';

const apolloFetch = require('apollo-fetch').createApolloFetch({ uri: GRAPH_URI });

export function fetch(city, lat, lon) {
  return dispatch => {

    dispatch({type: START_FETCH_CURRENT_WEATHER});

    let query = getCurrentWeatherQuery({city, lat, lon});

    return apolloFetch({
      query: query,
    }).then(res => {
      dispatch({type: END_FETCH_CURRENT_WEATHER, payload: res.data});
      console.log(res)
      return res.data;
    }, err => {
      dispatch({type: END_FETCH_CURRENT_WEATHER});
      dispatch({type: REQUEST_ERROR, payload: err});
      console.log(err.errors)
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
