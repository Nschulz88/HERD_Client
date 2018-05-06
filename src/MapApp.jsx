import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

import MapContainer from './MapContainer'


class MapApp extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MapContainer google={this.props.google}/>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-rvgStzujxRs4myTS1k28n3Vg_dQsUQw',
})(MapApp)
