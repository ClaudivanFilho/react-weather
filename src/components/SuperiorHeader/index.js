import React, { Component, PropTypes } from 'react';

import CityInput from '../CityInput'

import './index.scss';

export default class SuperiorHeader extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 app-pickup-form">
        { this.props.weather && this.props.weather.country &&
          <h2 className="float-left" style={{marginTop: "10px"}}>
            {this.props.weather.name + ', ' + this.props.weather.country}
          </h2> 
        }
        <CityInput />
      </div>
    );
  }
}

