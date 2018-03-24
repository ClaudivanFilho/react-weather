import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import './index.scss';

export default class SuperiorMenu extends Component {
  
  constructor(props) {
    super(props);
  }

  isForecastRoute() {
    return window.location.href.indexOf('/forecast') != -1;
  }
  
  render() {
    return (
      <div className="ui fixed menu">
        <Link to="/">
          <div className={`${!this.isForecastRoute() ? 'active' : ''} item`}>
            Current Weather
          </div>
        </Link>
        <Link to="/forecast">
          <div className={`${this.isForecastRoute() ? 'active' : ''} item`}>
            Forecast
          </div>
        </Link>
      </div>
    );
  }
}

