import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import { Button } from "react-bootstrap";

export default class MapContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showingInfoWindow: true,
      showSideBox: false,
      activeMarker: {},
      selectedPlace: {},
      events: undefined,
      spec_event: undefined,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.toggleSideBox = this.toggleSideBox.bind(this);
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

  toggleSideBox = (props) => {
    const { showSideBox } = this.state;
    console.log("these are my props in toggleSideBox", props);
    axios.get(`/api/events/${props}`)
    .then(res => {
      console.log("this is my res.data", res.data);
      this.setState( {
        spec_event : res.data,
        showSideBox : !showSideBox
      });
      console.log("--------state??-->", this.state.spec_event)
    })
    .catch(err =>{
      throw err;
    })
  }

  componentWillMount() {
    console.log("THIS LOooDED!!")
    axios.get(`/api/events`)
    .then(res => {
      const events = res.data;
      console.log("---------->", events)
      this.setState({ events });
      console.log("--------state??-->", this.state.events)
    })
    .then(() => {
      this.loadMap()
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
        mapTypeId: 'roadmap', // could also be set to: Terrain, satellite, hybrid
        styles:[
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "hue": "#FFBB00"
                        },
                        {
                            "saturation": 43.400000000000006
                        },
                        {
                            "lightness": 37.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "stylers": [
                        {
                            "hue": "#FFC200"
                        },
                        {
                            "saturation": -61.8
                        },
                        {
                            "lightness": 45.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 51.19999999999999
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 52
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#C6E2FF"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "hue": "#00FF6A"
                        },
                        {
                            "saturation": 22.0989010989011234
                        },
                        {
                            "lightness": 11.200000000000017
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },

                {
                  featureType: 'poi.business',
                  stylers: [{visibility: 'off'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'labels.icon',
                  stylers: [{visibility: 'off'}]
                }

            ]
      })
      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      console.log("CHECK this.state.events", this.state.events)
      this.map.addListener('click', () => {
        console.log("mapppppitude");
        this.setState( {spec_event : undefined});
      });

      var activeInfoWindow; 
      for (let event of this.state.events) {
        console.log("IS THIS WORKING??", event)
        const contentString = '<div id="infoWindowContent">'+
        '<h5>' + event.event_description +'</h5>'+
        '<div><strong>Volunteers needed: </strong>' + event.event_size +'</div>'+
        '<div><strong>Location: </strong>' + event.location +'</div>'+ //.slice(0, -23) removes Vancouver BC part
        '<div><strong>Date: </strong>' + event.event_date.slice(0,-14) +'</div>'+
        '<h4 class="view-details"' + event.id + '">Click to view more details</h4>'+
        '</div>';
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        var icon = {
            url: require('./small_pointer.png'), // url
            scaledSize: new google.maps.Size(35, 60), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
            labelOrigin: new google.maps.Point(18,25)
        };

        const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
          position: {lat: event.GMaps_API_location.lat, lng: event.GMaps_API_location.lng}, // sets position of each marker
          map: this.map,
          title: event.event_description, // the title of the marker is set to the name of the location
          animation: google.maps.Animation.DROP,
          icon: icon,
          label: {
            text: '1',
            color: 'white',
            fontSize: "18px",
          },
          eventID: event.id
        });
        marker.addListener('mouseover', () => {
          if (activeInfoWindow) { activeInfoWindow.close();}
          infowindow.open(this.map, marker);
          activeInfoWindow = infowindow;
          const details = document.querySelector('#infoWindowContent .view-details');
          details.addEventListener('click', () => {
            this.toggleSideBox(event.id);
          });
        });
        marker.addListener('click', () => {
          infowindow.close(this.map, marker);
        })
      }
    }
  }

  render() {
    return ( // in our return function you must return a div with ref='map' and style.
      <div>
        <div ref="map" className="mapContainer" onClick={ this.onMarkerClick } >
          loading map...
        </div>
        { <Sidebox thisEvent={ this.state.spec_event } />}

      </div>
    )
  }
}

class Sidebox extends Component {
  constructor(props) {
    super(props)
    this.onSignUp = this.onSignUp.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  onSignUp(){
    let event_id = this.props.thisEvent[0].id
    axios({
      method: 'post',
      url: `/api/events/${event_id}`,
      data: {
        event_id : event_id
      },
      withCredentials: true,
    });
  }

  getTime(){
    let timeString = (this.props.thisEvent[0].event_time).slice(0,-3)
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString
  }

  render() {
    if (!this.props.thisEvent) {
      return <div className="sideBox" style={{right: '-50%'}}></div>
    } else {
      return (
        <div className="sideBox">
          <div className="sideBoxInfo">
            <h3 id="event_description">{this.props.thisEvent[0].event_description}</h3>
            <div className="infoBits"><strong>Volunteers needed: </strong>{this.props.thisEvent[0].event_size}</div>
            <div className="infoBits"><strong>Location: </strong>{(this.props.thisEvent[0].location)}</div> {/*.slice(0, -23)*/}
            <div className="infoBits"><strong>Date: </strong>{(this.props.thisEvent[0].event_date).slice(0,10)}</div>
            <div className="infoBits"><strong>Time: </strong>{this.getTime()}</div>
            <Button onClick={this.onSignUp}>Sign Up</Button>
          </div>
        </div>
      )
    }
  }
}
