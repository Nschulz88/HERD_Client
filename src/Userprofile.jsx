import React, { Component } from "react";
import "./Userprofile.css";
// import { Button } from "react-bootstrap";

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
      <h1>Profile for {this.state.username}</h1>

      <ul>
        <li>Email address: {this.state.emailAddress}</li>
        <li>Total volunteer hours: {this.state.vol_hours}</li>
      </ul>
    </div>
    );
  } 
}

export default Userprofile;
