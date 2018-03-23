import React, { Component, PropTypes } from 'react';

import './index.scss';

export default class SuperiorMenu extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui fixed menu">
        <a className="active item">
          Home
        </a>
        <a className="item">
          Historic
        </a>
        <a className="item">
          Forecast
        </a>
      </div>
    );
  }
}

