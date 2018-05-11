import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';
import ImagesUploader from 'react-images-uploader';
import axios from 'axios';
import 'react-images-uploader/font.css';
import './profileStyles.css';
import './Userprofile.css';
import { Button } from "react-bootstrap";

// Check out node client library
// <img className="pic" src="https://image.ibb.co/m1Bq8n/Sam.png"/>

class Userprofile extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      volunteers: [],
    };
  }


componentDidMount() {
  axios.get('/api/volunteers/:id', {
    id          : this.state.id,
    vol_name    : this.state.vol_name,
    vol_email   : this.state.vol_email,
    vol_hours   : this.state.vol_hours
  }).then(res => {
    const volunteers = res.data;
    this.setState({ volunteers: volunteers });
  })
  .catch(err =>{
    throw err;
  })
}


  render() {


    if(!this.state.volunteers.length){
      return(
        <div>
          Loading...
        </div>
      )}

    return (
      <div className='userprofile-body'>

      <ImagesUploader
            url="http://localhost:3001/notmultiple"
            optimisticPreviews
            multiple={false}
            onLoadEnd={(err) => {
                if (err) {
                    console.error(err);
                }
            }}
            />
    <div className="box"></div>
      <br></br>
      <h1 className="profile">{this.state.volunteers[0].vol_name}</h1><h1 className="detail"> (Volunteer)</h1>
      <ul>
        <br></br><br></br>
        <p className="userDetails">Email: </p><p className="detail">{this.state.volunteers[0].vol_email}</p><br></br>
        <p className="userDetails">Location: </p><p className="detail">Vancouver, Canada</p><a href="/edit">Edit</a><br></br>
        <p className="userDetails">Member since:</p><p className="detail"> DD/MM/YY</p><br></br>
        <p className="userDetails">Total volunteer hours:</p><p className="detail"> {this.state.volunteers[0].vol_hours}</p><br></br>
        <p className="summary">Summary:</p><p className="detail">An incredibly hardworking, studious and technically astute individual. I thrive at every activity with no exceptions.</p><a href="/edit">Edit</a>
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
