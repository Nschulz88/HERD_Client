import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';
import "./Userprofile.css";
import { Button } from "react-bootstrap";

class Userprofile extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: "Sam Schantz",
      emailAddress: "samtheman@something.com",
      vol_hours: 60
    };
  }

  render() {
    return (
      <div className='userprofile-body'>
      <br></br>
      <span class="box"></span>
      <h1 className="profile">Volunteer Profile: {this.state.username}</h1>
      <ul>
        <br></br><br></br>
        <p className="profile">Email address: {this.state.emailAddress} </p>
        <p className="profile">Total volunteer hours: {this.state.vol_hours}</p>
        <h1 className="skills">Volunteering Distribution</h1>
    </ul>
    <div className="circleClass">
    <CircularProgressbar className="CircularProgressbar1" percentage={60} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar2" percentage={30} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar3" percentage={10} initialAnimation/>
    </div>
    <div className="textClass">
    <p>Mentorship</p>
    <p>Educational</p>
    <p>Physical</p>
    </div>
  </div>
    );
  }
}

export default Userprofile;
