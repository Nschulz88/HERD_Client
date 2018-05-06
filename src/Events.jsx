import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";
import axios from 'axios';
import TimePicker from 'react-bootstrap-datetimepicker';
import Moment from 'react-moment';

var pass_obj = {}

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleTimePicker = this.handleTimePicker.bind(this);

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

  createEvent(e){
    axios({
      method: 'post',
      url: '/events',
      data: {
        location          : this.state.location,
        organization      : this.state.organization,
        event_size        : this.state.event_size,
        event_description : this.state.event_description,
        criteria          : this.state.criteria,
        event_date        : this.state.event_date,
        event_time        : this.state.event_time,
        duration          : this.state.duration,
      }
    });
  }

  handleTimePicker(e){
    var date = Date(e).slice(4, 15)
    var time = Date(e).slice(16, 25)
    this.setState({
      event_time: time,
      event_date: date
    });
  }

  handleChange(e) {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
    });
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
                <FormControl
                  type="text"
                  id="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
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

export default Register;
