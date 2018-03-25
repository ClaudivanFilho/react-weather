import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CityInput from '../CityInput'

import './index.scss';

export default class SuperiorHeader extends Component {
  
  render() {
    return (
      <div className="col-sm-12 app-pickup-form">
        { this.props.weather && this.props.weather.country &&
          <h2 className="float-left">
            {this.props.weather.name + ', ' + this.props.weather.country}
          </h2> 
        }
        <CityInput />
      </div>
    );
  }
}

SuperiorHeader.propTypes = {
  weather: PropTypes.shape({
    country: PropTypes.string, 
    name: PropTypes.string
  })
}


