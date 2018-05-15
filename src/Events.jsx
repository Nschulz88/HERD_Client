import React, { Component } from "react";
import { Button, FormGroup, FormControl, DropdownButton, MenuItem } from "react-bootstrap";
import "./Login_Register.css";
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react'
import TimePicker from 'react-bootstrap-datetimepicker';

import apiKey from "./apiKeys.json"

class CreateEvent extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleTimePicker = this.handleTimePicker.bind(this);
    this.changeEventType = this.changeEventType.bind(this);

    this.state = {
      location: '',
      GMaps_API_location: '',
      organization: '',
      event_size: '',
      event_description: '',
      criteria: '',
      event_date: '',
      event_time: '',
      duration: '',
      address: '',
    };
  }

  createEvent(e){
    axios({
      method: 'post',
      url: '/api/events',
      data: {
        location          : this.state.address,
        GMaps_API_location: this.state.GMaps_API_location,
        organization      : this.state.organization,
        event_size        : this.state.event_size,
        event_description : this.state.event_description,
        criteria          : this.state.criteria,
        event_date        : this.state.event_date,
        event_time        : this.state.event_time,
        duration          : this.state.duration,
        event_type        : this.state.event_type,
      },
      withCredentials: true,

    });
    this.props.history.push("/");
  }

  handleTimePicker(e){
    console.log(typeof e)
    var longDate = new Date(Number(e))
    var date = longDate.toString().slice(4,15)
    var time = longDate.toString().slice(16,21)
    console.log("THIS IS DATE",date)
    console.log("THIS IS TIME",time)

    this.setState({
      event_time: time,
      event_date: date,
    });

  }

  changeEventType(e) {
    this.setState({
      event_type: e.target.id
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
      .then(latLng => this.setState({GMaps_API_location: latLng}))
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
            <form onSubmit={this.createEvent.bind(this)}>
              <FormGroup
                name="vol_org"
                bsSize="small"
              >
                <DropdownButton
                  bsSize="large"
                  className="form-control"
                  id='dropdownBtn'
                  onChange={this.changeEventType}
                  title={this.state.event_type === true ? this.state.event_type : "Event Type"}
                  >
                  <MenuItem value={this.state.event_type} id="Mentoring" onClick={this.changeEventType}>Mentoring</MenuItem>
                  <MenuItem value={this.state.event_type} id="Educational" onClick={this.changeEventType}>Educational</MenuItem>
                  <MenuItem value={this.state.event_type} id="Physical Work" onClick={this.changeEventType}>Physical Work</MenuItem>
                </DropdownButton>
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
                  type="number"
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
                <TimePicker
                  type="time"
                  id="event_time"
                  placeholder="Event Time"
                  value={this.state.event_time}
                  onChange={this.handleTimePicker}
                />
                <FormControl
                  type="number"
                  id="duration"
                  placeholder="Duration"
                  value={this.state.duration}
                  onChange={this.handleChange}
                /> Hours
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
                  disabled={!this.state.event_description || !this.state.event_time || !this.state.event_date || !this.state.criteria || !this.state.organization || !this.state.event_size || !this.state.duration || !this.state.address || !this.state.GMaps_API_location || !this.state.event_type}
                >Create Event
                </Button>
            </form>
            <div className="login-footer">
              <a href="/login">I already have an account</a>
            </div>
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey[process.env.NODE_ENV],
})(CreateEvent)
