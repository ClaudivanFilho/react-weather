import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions'
import * as ForecastActions from '../../actions/ForecastActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SuperiorMenu from '../SuperiorMenu'
import SuperiorHeader from '../SuperiorHeader'
import WeatherInfo from '../WeatherInfo'
import Loading from '../Loading'
import GoogleMaps from '../GoogleMaps'
import Forecast from '../Forecast'

import { CSSTransitionGroup } from 'react-transition-group'

import './index.scss'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      view: 'CURRENT_WEATHER',
      position: { lat: -34.397, lng: 150.644 },
      zoom: 7
    };
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng =  position.coords.longitude;
      this.setState({ position: { lat, lng} });
      this.props.fetchCurrentWeather(null, lat, lng).then()
      this.props.fetchForecast(null, lat, lng).then()
    }, (err) => {
      // console.log(err)
    }, {timeout: 2000});
  }

  fetchWeather(lat, lng) {
    this.setState({
      position: {lat, lng},
      zoom: 7
    })
    this.props.fetchCurrentWeather(null, lat, lng).then()
    this.props.fetchForecast(null, lat, lng).then()
  }

  componentWillReceiveProps(props) {
    const { weather } = props.currentWeather
    if (weather) {
      const {lat, lon} = weather
      this.setState({
        position: {lat, lng: lon}
      })
    }
  }
  
  render() {
    const { weather, loading } = this.props.currentWeather;
    const { position, zoom } = this.state;
    return (
      <BrowserRouter>
        <div>
          <SuperiorMenu/>
          
          <div className="container"  style={{marginTop: "50px"}}>
          
          <SuperiorHeader weather={weather}></SuperiorHeader>

            <div className="col-sm-12 float-left">
              <GoogleMaps fetchWeather={(lat, lng) => this.fetchWeather(lat, lng)} zoom={zoom} position={position}/>
            </div>

            <CSSTransitionGroup transitionName="loading" transitionEnterTimeout={300} transitionLeaveTimeout={30}>
              <Loading active={loading}/>
            </CSSTransitionGroup>

            <CSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
              <Route exact path="/" component={WeatherInfo}/>
              <Route path="/forecast" component={Forecast}/>
            </CSSTransitionGroup>
            
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { currentWeather: state.currentWeather };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: (cityName, lat, lng) => dispatch(CurrentWeatherActions.fetch(cityName, lat, lng)),
    fetchForecast: (cityName, lat, lng) => dispatch(ForecastActions.fetch(cityName, lat, lng))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
