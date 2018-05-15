import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';
import axios from 'axios';
import 'react-images-uploader/font.css';
import './profileStyles.css';
import './Userprofile.css';
import Dropzone from 'react-dropzone';
import upload from 'superagent';

class Userprofile extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      volunteers: [],
      file:null
    };

    this.defineVolunteerStatus = this.defineVolunteerStatus.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
      console.log('------- this.state.volunteers ----------')
      console.log(this.state.volunteers[0].hours);
      console.log(typeof this.state.volunteers[0].hours)
    })
    .catch(err =>{
      throw err;
    })
  }
}

onDrop(files){
  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"))
  upload.post(`/api/upload/${parsedlocalstorage.id}`)
  .attach('profilepic', files[0])
  .then((res) => {
    console.log('did we get to promise')
    console.log(files[0])
  })
  .then((not) => {
    this.setState({ file: files[0] })
  })
}

onChange(files) {
  console.log('onchange happened on change on change on change')
  this.setState({file:files.target.files[0]})
}

defineVolunteerStatus(hours) {
  if (hours > 0 && hours < 20) {
    return "bronze"
  } if (hours > 19 && hours < 40) {
    return "silver"
  } if (hours > 39 && hours < 60) {
    return "gold"
  } if (hours > 59) {
    return "graduated"
  } else {
    return "new"
  }
}


  render() {
    if(!this.state.volunteers.length){
      return(
        <div>
          You need to be logged in to view your profile.
        </div>
      )}
      else{
        let eventDetails = [];
        let volunteers = this.state.volunteers;
        if(this.state.volunteers[0].hours === 0){
          eventDetails.push(<p className="heading">Sign up for some events!</p>)
        } else {
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
        }

return (
    <div className='userprofile-body'>
        <Dropzone className = "iu-loadContainer2" onDrop={this.onDrop}>
          {this.state.volunteers[0].pic_url != undefined ? <img className="iu-loadContainer" src={this.state.volunteers[0].pic_url}></img> : <div className="iu-loadContainer">Upload a profile picture</div>}
        </Dropzone>
      <br></br>
      <h1 className="profile">{this.state.volunteers[0].name}</h1><h1 className="detail"> (Volunteer)</h1>
      <ul>
        <br></br><br></br>
        <p className="userDetails">Email: </p><p className="detail">{this.state.volunteers[0].email}</p><br></br>
        <p className="userDetails">Location: </p><p className="detail">Vancouver, Canada</p><a href="/edit">Edit</a><br></br>
        <p className="userDetails">Member since:</p><p className="detail"> DD/MM/YY</p><br></br>
        <p className="userDetails">Total volunteer hours:</p><p className="detail"> {this.state.volunteers[0].hours}</p><br></br>

        <p className="userDetails">Volunteer Status:</p>
        {this.defineVolunteerStatus(this.state.volunteers[0].hours) === "new" ? <img className="badge-image" src={require("./new_label.png")} alt="new-member-icon"></img> : ''}
        {this.defineVolunteerStatus(this.state.volunteers[0].hours) === "bronze" ? <img className="badge-image" src={require("./bronze_medal.png")} alt="bronze-medal-icon"></img> : ''}
        {this.defineVolunteerStatus(this.state.volunteers[0].hours) === "silver" ? <img className="badge-image" src={require("./silver_medal.png")} alt="silver-medal-icon"></img> : ''}
        {this.defineVolunteerStatus(this.state.volunteers[0].hours) === "gold" ? <img className="badge-image" src={require("./gold_medal.png")} alt="gold-medal-icon"></img> : ''}
        {this.defineVolunteerStatus(this.state.volunteers[0].hours) === "graduated" ? <img className="badge-image" src={require("./new_label.png")} alt="graduated-status-icon"></img> : ''}
        <br></br>
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

    <div className="eventStyle"><br></br>{eventDetails}</div>

  </div>
  )};
  }
}

export default Userprofile;
