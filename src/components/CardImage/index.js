import React, { Component, PropTypes } from 'react';

import './index.scss';

import Moment from 'react-moment';
import iconSunset from '../../images/sunset.svg'
import iconSunrise from '../../images/sunrise.svg'

export default class CardImage extends Component {
  
  constructor(props) {
    super(props);
  }

  getIcon() {
    if (this.props.image == 'sunset') {
      return iconSunset
    } else if (this.props.image == 'sunrise') {
      return iconSunrise;
    }
  }

  render() {
    if (!this.props.date) return null;
    return (
      <div style={{textAlign: "center"}}>
        <h2>{this.props.title}</h2>
        <div className="col-sm-12">
          <img src={this.getIcon()} width={200}/>
        </div>
        <div className="col-sm-12">
          <h5>
            <Moment unix format="HH:mm:ss A">
              {this.props.date}
            </Moment>
          </h5>
        </div>
      </div>
    );
  }
}

