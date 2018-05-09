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
      <img className="pic" src="https://image.ibb.co/m1Bq8n/Sam.png"/>
      <br></br>
      <div className="box"></div>
      <h1 className="profile">{this.state.username} (Volunteer)</h1>
      <ul>
        <br></br><br></br>
        <p className="details">Email: {this.state.emailAddress} </p>
        <p className="details">Location: Vancouver, Canada</p>
        <p className="details">Member since: DD/MM/YY</p>
        <p className="details">Total volunteer hours: {this.state.vol_hours}</p>
        <p className="summary">Summary: An incredibly hardworking, studious and technically astute individual. I thrive at every activity with no exceptions.</p>
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
