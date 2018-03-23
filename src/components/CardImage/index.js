import React, { Component, PropTypes } from 'react';

import './index.scss';

export default class CardImage extends Component {
  
  constructor(props) {
    super(props);
  }

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

