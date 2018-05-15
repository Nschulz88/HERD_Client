import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';
import axios from 'axios';
import 'react-images-uploader/font.css';
import './profileStyles.css';
import './Userprofile.css';
import { Button } from "react-bootstrap";
import Dropzone from 'react-dropzone';
import upload from 'superagent';

class Userprofile extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      volunteers: [],
    };
  }


componentDidMount() {
  console.log("this is local storage",localStorage);
  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"))
  console.log("parsed local storage",parsedlocalstorage)

  if(parsedlocalstorage){
    axios.get(`/api/volunteers/${parsedlocalstorage.id}`, {
    }).then(res => {
      const volunteers = res.data;
      console.log("res.data",volunteers);
      this.setState({ volunteers: volunteers });
      console.log(this.state.volunteers);
      console.log(this.state.volunteers[0].pic_url);

    })
    .catch(err =>{
      throw err;
    })
  }
}

onDrop(files){

  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"))

  console.log("these are files",files);
  upload.post(`/api/upload/${parsedlocalstorage.id}`)
  .attach('profilepic', files[0])
  .end((err, res) => {
    if (err) console.log("Jellybeans", err);
    else {
      console.log("so uploaded fam.")
      alert('File uploaded!');
    }
  })
  console.log("How about this?")

}


  render() {

    if(!this.state.volunteers.length){
      return(
        <div>
          Loading...
        </div>
      )}

      else{

        let eventDetails = [];
        let volunteers = this.state.volunteers;

        for (let item in volunteers) {

          let count = (parseInt(item)+1);

          eventDetails.push(<div>
          <p className="heading">{[count]}. {this.state.volunteers[item].event_description}</p>
          <p className="event">Location: </p><p className="event2">{this.state.volunteers[item].location}</p><br></br>
          <p className="event">Date: </p><p className="event2">{this.state.volunteers[item].event_date}</p><br></br>
          <p className="event">Start Time: </p><p className="event2">{this.state.volunteers[item].event_time}</p><br></br>
          <p className="event">Duration: </p><p className="event2">{this.state.volunteers[item].duration} hours</p><br></br>
          <p className="event">Event Type: </p><p className="event2">{this.state.volunteers[item].event_type}</p><br></br>
          <br></br><br></br>
          </div>)
        }

        console.log("YOOOO",eventDetails)


    return (
      <div className='userprofile-body'>
      <Dropzone className = "iu-loadContainer2" onDrop={this.onDrop}>
        <div>
          Upload profile pic!
        </div>
      </Dropzone>

      <img className="iu-loadContainer" src={this.state.volunteers[0].pic_url}></img>
      <br></br>
      <h1 className="profile">{this.state.volunteers[0].name}</h1><h1 className="detail"> (Volunteer)</h1>
      <ul>
        <br></br><br></br>
        <p className="userDetails">Email: </p><p className="detail">{this.state.volunteers[0].email}</p><br></br>
        <p className="userDetails">Location: </p><p className="detail">Vancouver, Canada</p><a href="/edit">Edit</a><br></br>
        <p className="userDetails">Member since:</p><p className="detail"> DD/MM/YY</p><br></br>
        <p className="userDetails">Total volunteer hours:</p><p className="detail"> {this.state.volunteers[0].hours}</p><br></br>
        <p className="summary">Summary:</p><p className="detail">An incredibly hardworking, studious and technically astute individual. I thrive at every activity with no exceptions.</p><a href="/edit">Edit</a>
        <h1 className="skills">Volunteering Distribution</h1>
    </ul>
    <div className="circleClass">
    <CircularProgressbar className="CircularProgressbar1" percentage={33.3} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar2" percentage={33.3} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar3" percentage={33.3} initialAnimation/>
    </div>
    <div className="textClass">
    <p>Mentorship</p>
    <p>Educational</p>
    <p>Physical</p>
    </div>
    <br></br>
    <h1 className="upcoming">Upcoming Events</h1>
    <br></br>

    <div>{eventDetails}</div>

  </div>
  )};
  }
}

export default Userprofile;
