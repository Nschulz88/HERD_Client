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
      showInfowindow: false,
      showSideBox: false,
      activeMarker: {},
      selectedPlace: {},
      events: undefined,
      spec_event: undefined,
      loggedInAttendee: false,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.toggleSideBox = this.toggleSideBox.bind(this);
    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.attendee = this.attendee.bind(this);
    this.signUpCancel = this.signUpCancel.bind(this);
  }

  attendee() {
    if (this.state.loggedInAttendee){
      return false
    } else {
      return true
    }
  }

  signUpCancel(){
    if (this.state.loggedInAttendee === false){
      this.setState({loggedInAttendee: true})
    } else {
      this.setState({loggedInAttendee: false})
    }
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

  toggleInfoWindow = (props) => {
    console.log("these are my props in toggleInfoWindow", props);
  }

  toggleSideBox = (props) => {
    const { showSideBox } = this.state;
    axios.get(`/api/events/${props}`)
    .then(res => {
      let resultsArray = res.data;
      let loggedInAttendee = false;
      let findUserId = JSON.parse(localStorage.getItem('userInfo'))
      resultsArray.forEach((e) =>{
        if(findUserId !== null && e.vol_id === findUserId.id){
          loggedInAttendee = true
        }
      })
      this.setState( {
        spec_event : resultsArray,
        showSideBox: true,
        loggedInAttendee: loggedInAttendee
      });
    })
    .catch(err =>{
      throw err;
    })
  }

  componentWillMount() {
    axios.get(`/api/events`)
    .then(res => {
      const events = res.data;
      this.setState({ events });
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
              "featureType": "poi",
              "stylers": [
                  {
                      "hue": "#00FF6A"
                  },
                  {
                      "visibility": "on"
                  },
                  {
                      "saturation": 0
                  },
                  {
                      "lightness": 0
                  },
                  {
                      "gamma": 0
                  }
              ]
          },
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
      let map = this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      this.map.addListener('click', () => {
        this.setState( {showSideBox : false});
      });

      var activeInfoWindow;
      for (let event of this.state.events) {
          axios.get(`/api/rsvps/${event.id}`)
            .then(res => {
              var event_cap = Number(event.event_size)
              var signedup = Number(res.data.length)
              signedup = (event_cap - signedup)
              let pinURL = ''
              if (signedup > 0){
                pinURL += 'small_pointer'
              } else {
                pinURL += 'red_small_pointer'
              }
              var icon = {
                url: require('./'+pinURL+'.png'), // url
                scaledSize: new google.maps.Size(35, 60), // scaled size
                labelOrigin: new google.maps.Point(17,23)
              };

              signedup = signedup.toString()

              const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
                position: {lat: event.GMaps_API_location.lat, lng: event.GMaps_API_location.lng}, // sets position of each marker
                map: map,
                title: event.event_description, // the title of the marker is set to the name of the location
                icon: icon,
                label: {
                  text: signedup,
                  color: 'white',
                  fontSize: "15px",
                },
                eventID: event.id
              });

              const infowindow = new google.maps.InfoWindow({
              });

              marker.addListener('mouseover', () => {
                this.toggleInfoWindow(event.id)
                const contentString = '<div id="infoWindowContent">'+
                  '<h4>' + event.event_description +'</h4>'+
                  '<div><strong>Volunteers needed: </strong>' + event.event_size +'</div>'+
                  '<div><strong>Location: </strong>' + event.location +'</div>'+ //.slice(0, -23) removes Vancouver BC part
                  '<div><strong>Date: </strong>' + event.event_date.slice(0,-14) +'</div>'+
                  '<h5 class="details"' + event.id + '">Click the pin for more details!</h5>'+
                  '</div>';
                infowindow.setContent(contentString)
                infowindow.open(this.map, marker)
              });

              marker.addListener('click', () =>{
                this.toggleSideBox(event.id);
              });
              marker.addListener('mouseout', () => {
                infowindow.close(this.map, marker);
              });
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
        { <Sidebox forceUpdate={ this.forceUpdate } loggedInAttendee={ this.state.loggedInAttendee } thisEvent={ this.state.spec_event } showSideBox={ this.state.showSideBox } signUpAction={ this.signUpAction } loadMap={ this.loadMap } attendee={ this.attendee } signUpCancel={ this.signUpCancel }/>}
      </div>
    )
  }
}

class Sidebox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedup : true,
      loggedInAttendee: false
    }
    this.onSignUp = this.onSignUp.bind(this);
    this.getTime = this.getTime.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  onSignUp(){
    let event_id = this.props.thisEvent[0].event_id
    let phone_number = this.props.thisEvent[0].phone_number
    if(event_id === undefined){
      event_id = this.props.thisEvent[0].id
    }
    axios({
      method: 'post',
      url: `/api/events/${event_id}`,
      withCredentials: true,
    }).then( res => {
      this.props.loadMap()
    })
    this.setState({ loggedInAttendee: true })
    this.props.signUpCancel()
    let userInfo = localStorage.getItem("userInfo");
    axios.post('/api/twilio', {
      phone_number : phone_number,
      event_id : event_id,
      name : JSON.parse(userInfo).name
    })
    
  }

  cancel(){
    let event_id = this.props.thisEvent[0].event_id
    if(event_id === undefined){
      event_id = this.props.thisEvent[0].id
    }
    axios({
      method: 'delete',
      url: `/api/events/${event_id}/cancel`,
      withCredentials: true,
    }).then( res =>{
      this.props.loadMap()
    })
    this.setState({ loggedInAttendee: false })
    this.props.signUpCancel()
  }

  getTime(){
    let timeString = (this.props.thisEvent[0].event_time).slice(0,-3)
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString
  }

  showSignUp(){
    let parsed = JSON.parse(localStorage.getItem('userInfo'))
    if(parsed && parsed.vol_org === 'volunteer') {
      return true
    } else {
      return false
    }
  }

  render() {
    const signUpButton = <div><Button className="signup-cancel" onClick={this.onSignUp}>Sign Up</Button></div>
    const cancelButton = <div><Button className="signup-cancel" onClick={this.cancel}>Cancel</Button></div>

    let eventDetails = [];
        let volunteers = this.props.thisEvent;
          for (let item in volunteers) {
          if (this.props.thisEvent[item].pic_url){
            eventDetails.push(
            <a href={"/user/"+this.props.thisEvent[item].vol_id}><img className="pics" alt={this.props.thisEvent[item].name} title={this.props.thisEvent[item].name} src={this.props.thisEvent[item].pic_url}></img></a>
            )
          }
        }

    if (!this.props.showSideBox) {
      return <div className="sideBox" style={{right: '-70%'}}></div>
    } else {
      return (
        <div className="sideBox">
        <div className="sideBoxInfo">
          <h3 className="event_description">{this.props.thisEvent[0].event_description}</h3>
          <div className="infoBits"><strong>Volunteers needed: </strong>{this.props.thisEvent[0].event_size}</div>
          <div className="infoBits"><strong>Location: </strong>{(this.props.thisEvent[0].location)}</div> {/*.slice(0, -23)*/}
          <div className="infoBits"><strong>Date: </strong>{(this.props.thisEvent[0].event_date).slice(0,10)}</div>
          <div className="infoBits"><strong>Time: </strong>{this.getTime()}</div>
          <div className="infoBits"><strong>Duration: </strong>{(this.props.thisEvent[0].duration)} hours</div>
          <div className="infoBits"><strong>Criteria: </strong>{(this.props.thisEvent[0].criteria)}</div>
          { this.showSignUp() ? (this.props.attendee() ? signUpButton : cancelButton): ''}
          <div className="picsDiv">{eventDetails}</div>
        </div>
      </div> 
      )
    }
  }
}
