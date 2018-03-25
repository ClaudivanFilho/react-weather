import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions';
import * as ForecastActions from '../../actions/ForecastActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from "underscore";

import './index.scss';

export class CityInput extends Component {
  
  constructor(props) {
    super(props);
    // this code does a delay in the input onChange event before fire an event.
    this.delayedOnChangeCity = _.debounce(event => this.fetchByCity(event.target.value), 1000);
  }

  fetchByCity(cityName) {
    this.props.fetchCurrentWeather(cityName).then();
    this.props.fetchForecast(cityName).then();
  }
  
  onChangeCity(event) {
    event.persist()
    this.delayedOnChangeCity(event);
  }
  
  render() {
    return (
      <div className="ui form text-right">
        <div className="inline fields float-right">
          <label> Move the marker to a location or type a city:  </label>
          <input className="col-sm-4" type="text" onChange={(e) => {
            this.onChangeCity(e);
          }}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: cityName => dispatch(CurrentWeatherActions.fetch(cityName)),
    fetchForecast: cityName => dispatch(ForecastActions.fetch(cityName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
