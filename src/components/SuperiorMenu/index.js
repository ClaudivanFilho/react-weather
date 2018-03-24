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
          <a className={`${!this.isForecastRoute() ? 'active' : ''} item`}>
            Current Weather
          </a>
        </Link>
        <Link to="/forecast">
        <a className={`${this.isForecastRoute() ? 'active' : ''} item`}>
            Forecast
          </a>
        </Link>
      </div>
    );
  }
}

