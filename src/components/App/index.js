import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CityInput from '../CityInput'
import CardImage from '../CardImage'

import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransitionGroup } from 'react-transition-group'

import LoadingIcon from '../../images/sun_loader.gif'

import Map from '../Map'

import './index.scss'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
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
    return (
      <div>
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

      <div className="container"  style={{marginTop: "50px"}}>
        <div className="col-sm-12 app-pickup-form">
          {
            weather && 
            <h2 className="float-left" style={{marginTop: "10px"}}>
              {weather.name + ', ' + weather.country}
            </h2>
          }
          <CityInput/>
        </div>
        <div className="col-sm-12 float-left">
          <Map fetchWeather={(lat, lng) => this.fetchWeather(lat, lng)} 
            zoom={this.state.zoom}
            position={this.state.position}/>
        </div>
        <div className="ui clearing divider"></div>
        <CSSTransitionGroup
          transitionName="loading"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={30}>
          {
            loading &&
            <div className="col-sm-12 loading" style={{textAlign: "center"}}>
            <img src={LoadingIcon} width={100}/>
            </div>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
        transitionName="card"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}>
        {
          weather && 
            <div>
              <div className="ui horizontal divider">
                Current Weather Info
              </div>
              <div className="col-sm-6 float-left">
                <CardImage date={weather.sunrise} title="Sunrise" image="sunrise"/>
              </div>
              <div className="col-sm-6 float-left">
                <CardImage date={weather.sunset} title="Sunset" image="sunset"/>
              </div>
            </div>
          }
        </CSSTransitionGroup>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentWeather: state.currentWeather };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: (cityName, lat, lng) => dispatch(CurrentWeatherActions.fetch(cityName, lat, lng))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
