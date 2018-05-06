import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react' 

var pass_obj = {}

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);


    this.state = {
      location: '',
      organization: '',
      event_size: '',
      event_description: '',
      criteria: '',
      event_date: '',
      event_time: '',
      duration: '',
    };
  }

  register(e){
    axios.get('http://localhost:3001/volunteers', {
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleChange = (e) => {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
    });
  }

  handleChangeLocation = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }


  render() {
    console.log(this.state)
    return (
      <div className="Login">
          <div className="login-content">
            <div className="login-header">
              <div className="avatar">
                <img src={require('./letter_H.png')} alt="logo" className="img-responsive"/>
              </div>
              <div>
                <h4>Enter your event details!</h4>
              </div>
            </div>
            <form onSubmit={this.register.bind(this)}>
              <FormGroup
                name="vol_org"
                bsSize="small"
              >
              <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChangeLocation}
                  onSelect={this.handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                      <input
                        {...getInputProps({
                          id: 'address',
                          placeholder: 'Search Places ...',
                          className: 'location-search-input form-control'
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions.map(suggestion => {
                          const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div {...getSuggestionItemProps(suggestion, { className, style })}>
                              <span>{suggestion.description}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <FormControl
                  type="text"
                  id="event_size"
                  placeholder="Event Size"
                  value={this.state.event_size}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  id="organization"
                  placeholder="Organization"
                  value={this.state.organization}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  placeholder="Criteria"
                  id="criteria"
                  value={this.state.criteria}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  id="event_date"
                  placeholder="Event Date"
                  value={this.state.event_date}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  id="event_time"
                  placeholder="Event Time"
                  value={this.state.event_time}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  id="duration"
                  placeholder="Duration"
                  value={this.state.duration}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="text"
                  id="event_description"
                  placeholder="Event Description"
                  value={this.state.event_description}
                  onChange={this.handleChange}
                />
              </FormGroup>
                <Button
                  block
                  bsSize="large"
                  type="submit"
                  disabled={!this.state.event_description}
                >Create Event
                </Button>
            </form>
            <div class="login-footer">
              <a href="/login">I already have an account</a>
            </div>
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA-rvgStzujxRs4myTS1k28n3Vg_dQsUQw',
})(Register)

// export default Register
