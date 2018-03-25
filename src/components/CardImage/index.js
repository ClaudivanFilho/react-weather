import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class CardImage extends Component {

  render() {
    const {title, image, width, children, color} = this.props; 
    return (
      <div className={`card-image ${color ? 'bg-' + color: 'bg-grey'}`}>
        <h2>{title}</h2>
        <div className="col-sm-12">
          { image && <img src={image} width={width || 200}/> }
        </div>
        <div className="col-sm-12">
          <h5>
            {children}
          </h5>
        </div>
      </div>
    );
  }
}

CardImage.propTypes = {
  title: PropTypes.node, 
  image: PropTypes.string, 
  width: PropTypes.number, 
  children: PropTypes.node, 
  color: PropTypes.string
}