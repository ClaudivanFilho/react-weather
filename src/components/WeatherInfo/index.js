import React, { Component, PropTypes } from 'react';

import CardImage from '../CardImage'
import Moment from 'react-moment';

import iconSunset from '../../images/sunset.svg'
import iconSunrise from '../../images/sunrise.svg'
import iconSun from '../../images/if_Sunny_47314(1).png'
import iconWind from '../../images/if_Wind_Flag_Storm_47317.png'

import './index.scss';

export default class WeatherInfo extends Component {

  render() {
    const { weather } = this.props;
    return (
      weather && 
      <div>
        <div className="ui horizontal divider">
          Current Weather Info
        </div>
        <div className="ui raised segment col-sm-12 col-md-6 col-lg-3 col-xl-4 float-left" style={{margin: "0px"}}>
          <div style={{width: '100%'}}><strong>Actual state: </strong> {weather.main}</div>
          <div style={{width: '100%'}}><strong>State Description: </strong> {weather.description}</div>
          <strong>Temperature: </strong> {weather.temp}° <br/>
          <strong>Temperature Min: </strong> {weather.temp_min}°<br/>
          <strong>Temperature Max: </strong> {weather.temp_max}°<br/>
          <img style={{position: "absolute", right: "40px", top: "10px"}} 
            src={`http://openweathermap.org/img/w/${weather.icon}.png`} width="70"/>
          
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 col-xl-2 float-left">
        <CardImage width={50} title="Wind" image={iconWind}>
          {weather.wind} m/sec
        </CardImage>
      </div>
        <div className="col-sm-12 col-md-6 col-lg-3 float-left">
          <CardImage width={50} title="Sunrise" image={iconSunrise}>
            <Moment unix format="HH:mm:ss A">
              {weather.sunrise}
            </Moment>
          </CardImage>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 float-left">
          <CardImage width={50} title="Sunset" image={iconSunset}>
            <Moment unix format="HH:mm:ss A">
              {weather.sunset}
            </Moment>
          </CardImage>
        </div>
      </div>
    );
  }
}

