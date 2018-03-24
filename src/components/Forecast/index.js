import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import { CSSTransitionGroup } from 'react-transition-group'
import PredictionCard from '../PredictionCard'

import './index.scss';

class Forecast extends Component {

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
              forecast.list.map((prediction) => {
                return (
                  <div className="div-prediction float-left" key={prediction.date}>
                    <PredictionCard prediction={prediction} />
                  </div>
                )
              })
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

export default connect(mapStateToProps, {})(Forecast);

