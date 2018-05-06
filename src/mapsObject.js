const myObject = {
  id: 1,
  organizer_id: 1,
  GMaps_API_location: {
                         "results" : [
                            {
                               "address_components" : [
                                  {
                                     "long_name" : "Stanley Park",
                                     "short_name" : "Stanley Park",
                                     "types" : [ "establishment", "park", "point_of_interest" ]
                                  },
                                  {
                                     "long_name" : "Vancouver",
                                     "short_name" : "Vancouver",
                                     "types" : [ "locality", "political" ]
                                  },
                                  {
                                     "long_name" : "Greater Vancouver",
                                     "short_name" : "Greater Vancouver",
                                     "types" : [ "administrative_area_level_2", "political" ]
                                  },
                                  {
                                     "long_name" : "British Columbia",
                                     "short_name" : "BC",
                                     "types" : [ "administrative_area_level_1", "political" ]
                                  },
                                  {
                                     "long_name" : "Canada",
                                     "short_name" : "CA",
                                     "types" : [ "country", "political" ]
                                  },
                                  {
                                     "long_name" : "V6G 1Z4",
                                     "short_name" : "V6G 1Z4",
                                     "types" : [ "postal_code" ]
                                  }
                               ],
                               "formatted_address" : "Stanley Park, Vancouver, BC V6G 1Z4, Canada",
                               "geometry" : {
                                  "location" : {
                                     "lat" : 49.30425839999999,
                                     "lng" : -123.1442522
                                  },
                                  "location_type" : "GEOMETRIC_CENTER",
                                  "viewport" : {
                                     "northeast" : {
                                        "lat" : 49.3056073802915,
                                        "lng" : -123.1429032197085
                                     },
                                     "southwest" : {
                                        "lat" : 49.3029094197085,
                                        "lng" : -123.1456011802915
                                     }
                                  }
                               },
                               "place_id" : "ChIJo-QmrYxxhlQRFuIJtJ1jSjY",
                               "types" : [ "establishment", "park", "point_of_interest" ]
                            },
                            {
                               "address_components" : [
                                  {
                                     "long_name" : "Stanley Park",
                                     "short_name" : "Stanley Park",
                                     "types" : [ "establishment", "park", "point_of_interest" ]
                                  },
                                  {
                                     "long_name" : "400",
                                     "short_name" : "400",
                                     "types" : [ "street_number" ]
                                  },
                                  {
                                     "long_name" : "Western Avenue",
                                     "short_name" : "Western Ave",
                                     "types" : [ "route" ]
                                  },
                                  {
                                     "long_name" : "Westfield",
                                     "short_name" : "Westfield",
                                     "types" : [ "locality", "political" ]
                                  },
                                  {
                                     "long_name" : "Hampden County",
                                     "short_name" : "Hampden County",
                                     "types" : [ "administrative_area_level_2", "political" ]
                                  },
                                  {
                                     "long_name" : "Massachusetts",
                                     "short_name" : "MA",
                                     "types" : [ "administrative_area_level_1", "political" ]
                                  },
                                  {
                                     "long_name" : "United States",
                                     "short_name" : "US",
                                     "types" : [ "country", "political" ]
                                  },
                                  {
                                     "long_name" : "01085",
                                     "short_name" : "01085",
                                     "types" : [ "postal_code" ]
                                  },
                                  {
                                     "long_name" : "2521",
                                     "short_name" : "2521",
                                     "types" : [ "postal_code_suffix" ]
                                  }
                               ],
                               "formatted_address" : "Stanley Park, 400 Western Ave, Westfield, MA 01085, USA",
                               "geometry" : {
                                  "location" : {
                                     "lat" : 42.1243798,
                                     "lng" : -72.78399739999999
                                  },
                                  "location_type" : "ROOFTOP",
                                  "viewport" : {
                                     "northeast" : {
                                        "lat" : 42.1257287802915,
                                        "lng" : -72.78264841970849
                                     },
                                     "southwest" : {
                                        "lat" : 42.1230308197085,
                                        "lng" : -72.7853463802915
                                     }
                                  }
                               },
                               "place_id" : "ChIJL1sbscge54kRbxZSJE9kPCM",
                               "types" : [ "establishment", "park", "point_of_interest" ]
                            }
                         ],
                         "status" : "OK"
                      },
  event_size: 60,
  location: 'Stanley Park',
  event_description: '5k run to defeat smallpox',
  criteria: 'Bring sunscreen it will be hot!',
  event_date: '2016-06-23',
  event_time: '18:30',
  duration: 2
}

// console.dir(myObject.GMaps_API_location.results[1].geometry.location)


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

  componentDidMount() {
    console.log("THIS LOooDED!!")
    // axios.get(`/events`)
    // .then(res => {
    //   const events = res.data;
    //   console.log("---------->", events)
    //   this.setState({ events });
    // })

    this.loadMap();
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

   
      for (let event in this.state.events) {
        console.log("IS THIS WORKING??")
        const contentString = '<div id="infoWindowContent">'+ 
        '<h3>' + event.vol_name +'</h3>'+
        '<div>' + event.vol_email +'</div>'+
        '<div>' + event.hours +'</div>'+
        '<a href="/events/' + event.id + '">View more details</a>'+
        '</div>';
        const infowindow = new google.maps.InfoWindow({

          content: contentString
        });
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: event.GMaps_API_location.results[1].geometry.location.lat, lng: event.GMaps_API_location.results[1].geometry.location.lng}, // sets position of each marker
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




// OLD VERSION 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

  componentDidMount() {
    console.log("THIS LOooDED!!")
    // axios.get(`/events`)
    // .then(res => {
    //   const events = res.data;
    //   console.log("---------->", events)
    //   this.setState({ events });
    // })

    this.loadMap();
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

   
      for (let event in this.state.events) {
        console.log("IS THIS WORKING??")
        const contentString = '<div id="infoWindowContent">'+ 
        '<h3>' + event.vol_name +'</h3>'+
        '<div>' + event.vol_email +'</div>'+
        '<div>' + event.hours +'</div>'+
        '<a href="/events/' + event.id + '">View more details</a>'+
        '</div>';
        const infowindow = new google.maps.InfoWindow({

          content: contentString
        });
        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: event.GMaps_API_location.results[1].geometry.location.lat, lng: event.GMaps_API_location.results[1].geometry.location.lng}, // sets position of each marker
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





