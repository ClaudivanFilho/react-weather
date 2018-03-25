import React, { Component, PropTypes } from 'react';

import Moment from 'react-moment';
import './index.scss';

export default class PredictionCard extends Component {
  
  render() {
    const {date, icon, temp, info, imageWidth} = this.props.prediction;
    return (
      <div className={`prediction-card`}>
        <h5>
          <Moment unix format="DD/MMM HH:mm">
            {date}
          </Moment>
        </h5>
        <div className="div-image col-sm-12">
          { icon && <img src={`//openweathermap.org/img/w/${icon}.png`} width={imageWidth || 50}/> }
        </div>
        <div className="col-sm-12">
          <h5>
            {info}
          </h5>
        </div>
      </div>
    );
  }
}

