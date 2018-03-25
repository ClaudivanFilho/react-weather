import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { CSSTransitionGroup } from 'react-transition-group'
import PredictionCard from '../PredictionCard'

import Slider from 'react-slick'

import './index.scss';

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2,
      dots: false
    }
  }]
};

export class Forecast extends Component {

  render() {
    const {forecast} = this.props.forecast;
    return (
      <CSSTransitionGroup transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
        { forecast &&  
          <div className="col-sm-12 float-left">
            <div className="col-sm-12 ui horizontal divider">
              Forecast
            </div>
            {
              forecast.list.length && 
              <Slider {...sliderSettings}>
                {forecast.list.map((prediction) => {
                  return (
                    <div key={prediction.date}>
                      <PredictionCard {...prediction} />
                    </div>
                  )
                })}
              </Slider>
            }
          </div>
        }
      </CSSTransitionGroup>
      
    );
  }
}

const mapStateToProps = state => {
  return { forecast: state.forecast };
};

Forecast.propTypes = {
  forecast: PropTypes.shape({
    forecast: PropTypes.object,
    loading: PropTypes.bool
  })
}

export default connect(mapStateToProps, {})(Forecast);