import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

import * as CurrentWeatherActions from '../../actions/CurrentWeatherActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './index.scss';

class App extends Component {
  
  constructor(props) {
    super(props);
    props.fetchCurrentWeather('Campina Grande').then((data) => {
      console.log('finish', data);
    }, (err) => {
      console.log('errr', err)
    })
    console.log(props);
  }
  
  render() {
    return (
      <div>
        <Link to='/opa'>Home</Link>
        <button> 
          ok
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentWeather: state.currentWeather.weather
});

const mapActionsToProps = {
  fetchCurrentWeather: CurrentWeatherActions.fetch
}

export default connect(mapStateToProps, mapActionsToProps)(App);
