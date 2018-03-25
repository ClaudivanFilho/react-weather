import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from '../../images/sun_loader.gif'

import './index.scss';

export default class Loading extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.active &&
      <div className="col-sm-12 text-center loading">
        <img src={LoadingIcon} width={100}/>
      </div>
    );
  }
}

Loading.propTypes = {
  active: PropTypes.bool
}


