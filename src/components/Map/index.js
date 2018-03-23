import React, { Component, PropTypes } from 'react';
import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    zoom={props.zoom}
    defaultZoom={7}
    center={props.position}
  >
  <Marker
    draggable={true}
    position={props.position}
    onDragEnd={(event) => {
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();
      props.fetchWeather(latitude, longitude);
    }}
  />
  </GoogleMap>
)
