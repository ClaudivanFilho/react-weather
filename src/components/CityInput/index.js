import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from "underscore";

import './index.scss';

class CityInput extends Component {
  
  constructor(props) {
    super(props);
    this.delayedOnChangeCity = _.debounce(event => this.fetchByCity(event.target.value), 1000);
  }

  fetchByCity(cityName) {
    this.props.fetchCurrentWeather(cityName).then();
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
    fetchCurrentWeather: cityName => dispatch(CurrentWeatherActions.fetch(cityName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
