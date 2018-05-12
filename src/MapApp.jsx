import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import apiKey from './apiKeys.json'


import MapContainer from './MapContainer'


class MapApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: this.props.passedUser
    };
  }

  render() {
    return (
      <div>
        <MapContainer google={this.props.google} passedUser={this.state.user}/>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: apiKey[process.env.NODE_ENV],
})(MapApp)
