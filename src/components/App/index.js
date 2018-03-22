import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CityInput from '../CityInput'
import CardImage from '../CardImage'

import './index.scss'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { weather: null };
    // props.fetchCurrentWeather('Campina Grande').then((data) => {
    //   console.log('finish', data);
    //   this.setState({
    //     weather: data.weather
    //   });
    // }, (err) => {
    //   console.log('errr', err)
    // })
  }
  
  render() {
    const { weather } = this.props.currentWeather;
    return (
      <div className="container">
        <div className="ui right aligned segment form app-pickup-form">
          <CityInput />
        </div>
        {
          weather && 
          <div>
            <div className="col-sm-6 float-left">
              <CardImage date={weather.sunset} title="Sunset" image="sunset"/>
            </div>
            <div className="col-sm-6 float-left">
              <CardImage date={weather.sunrise} title="Sunrise" image="sunrise"/>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentWeather: state.currentWeather };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: cityName => dispatch(CurrentWeatherActions.fetch(cityName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
