import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import apiKey from './apiKeys.json'


import MapContainer from './MapContainer'


class MapApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: apiKey[process.env.NODE_ENV],
})(MapApp)
