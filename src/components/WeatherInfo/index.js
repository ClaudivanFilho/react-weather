import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import CardImage from '../CardImage'
import Moment from 'react-moment';

import iconSunset from '../../images/sunset.svg'
import iconSunrise from '../../images/sunrise.svg'
import iconWind from '../../images/if_Wind_Flag_Storm_47317.png'
import { CSSTransitionGroup } from 'react-transition-group'

import './index.scss';

export class WeatherInfo extends Component {

  render() {
    const { weather } = this.props.currentWeather;
    return (
      <CSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
        {
          weather && 
          <div className="col-sm-12 float-left">
            <div className="col-sm-12 ui horizontal divider">
              Current Weather Info
            </div>
            <div className="ui raised segment col-sm-12 col-md-6 col-lg-3 col-xl-4 float-left" style={{margin: "0px"}}>
              <div style={{width: '100%'}}><strong>Actual state: </strong> {weather.main}</div>
              <div style={{width: '100%'}}><strong>State Description: </strong> {weather.description}</div>
              <strong>Temperature: </strong> {weather.temp}°C <br/>
              <strong>Temperature Min: </strong> {weather.temp_min}°C<br/>
              <strong>Temperature Max: </strong> {weather.temp_max}°C<br/>
              <img className="details-image" src={`//openweathermap.org/img/w/${weather.icon}.png`} width="70"/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-2 float-left">
            <CardImage width={50} title="Wind" image={iconWind} color="blue">
              {weather.wind} m/sec
            </CardImage>
          </div>
            <div className="col-sm-12 col-md-6 col-lg-3 float-left">
              <CardImage width={50} title="Sunrise" image={iconSunrise} color="yellow">
                <Moment unix format="HH:mm:ss A">
                  {weather.sunrise}
                </Moment>
              </CardImage>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 float-left">
              <CardImage width={50} title="Sunset" image={iconSunset} color="yellow">
                <Moment unix format="HH:mm:ss A">
                  {weather.sunset}
                </Moment>
              </CardImage>
            </div>
          </div>
        }
      </CSSTransitionGroup>
    );
  }
}

WeatherInfo.propTypes = {
  currentWeather: PropTypes.shape({
    weather: PropTypes.object
  })
}

const mapStateToProps = state => {
  return { currentWeather: state.currentWeather };
};

export default connect(mapStateToProps, {})(WeatherInfo);