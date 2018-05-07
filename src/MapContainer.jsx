import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

export default class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedPlace: {},
      events: undefined,
      locations: [
        { name: "Lighthouse Labs", id: 1, event_size: 60, event_description: "Teach stuff", criteria: 'Must be smart', event_date: '2016-06-23', location: {lat: 49.2819163, lng: -123.10831740000003} },
        { name: "BC Place", id: 2, event_size: 100, event_description: "Hand out flyers", criteria: 'Must be able to climb lots of staris', event_date: '2016-06-23', location: {lat: 49.27675, lng: -123.11199899999997} },
        { name: "BC Childrens Hospital", id: 3, event_size: 20, event_description: "Give out gifts to kids", criteria: 'Must have police clearance', event_date: '2016-06-23', location: {lat: 49.24462140000001, lng: -123.12588640000001} },
        { name: "Stanley Park", id: 4, event_size: 63, event_description: "Give athletes water", criteria: 'Bring sunscreen it will be hot!', event_date: '2016-06-23', location: {lat: 49.6412336, lng: -123.14425219999998} },
        { name: "Canada Place", id: 5, event_size: 200, event_description: "Give out popcourn", criteria: 'Must be able to lift, bro', event_date: '2016-06-23', location: {lat: 49.2888248, lng: -123.1111209} }
      ]
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  componentWillMount() {
    console.log("THIS LOooDED!!")
    axios.get(`/events`)
    .then(res => {
      const events = res.data;
      console.log("---------->", events)
      this.setState({ events });
      console.log("--------state??-->", this.state.events)
    })
      .then(() => {
        this.loadMap()
      })
      .catch(err => {
        throw err;
      })
    .catch(err =>{
      throw err;
    })
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      console.log("I am logging this.props in the loadMap():", this.props)
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 49.2827291, lng: -123.12073750000002},
        zoom: 12,
        mapTypeId: 'roadmap' // could also be set to: Terrain, satellite, hybrid
      })
      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      console.log("CHECK this.state.events", this.state.events)

      for (let event of this.state.events) {
        console.log("IS THIS WORKING??", event)
        const contentString = '<div id="infoWindowContent">'+
        '<h3>' + event.location +'</h3>'+
        '<div><strong>Volunteers needed: </strong>' + event.event_size +'</div>'+
        '<div><strong>Description: </strong>' + event.event_description +'</div>'+
        '<div><strong>Date: </strong>' + Date(event.event_date) +'</div>'+
        '<a class="details" href="/events/' + event.id + '">View more details</a>'+
        '</div>';
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: event.GMaps_API_location.lat, lng: event.GMaps_API_location.lng}, // sets position of each marker
          map: this.map,
          title: event.event_description, // the title of the marker is set to the name of the location
          animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
      }
    }
  }

  render() {
    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" className="mapContainer" onClick={ this.onMarkerClick } >
        loading map...
      </div>
    )
  }
}
