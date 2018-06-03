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
      coverfile:null,
      file:null,
      bar1: 0,
      bar2: 0,
      bar3: 0,
      currentVol : ''
    };

    this.defineVolunteerStatus = this.defineVolunteerStatus.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }


componentDidMount() {
  let parsedlocalstorage = this.props.match.params
  if (typeof JSON.parse(localStorage.getItem("userInfo")) === 'number'){
    parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  }
  if(parsedlocalstorage){
    axios.get(`/api/volunteers/${parsedlocalstorage.id}`, {
    }).then(res => {
      const volunteers = res.data;
      let bar1 = 0;
      let bar2 = 0;
      let bar3 = 0;
      //calculates percentages for progress bars
      res.data.forEach((event) => {
        if(event.event_type === 'Mentoring'){
          bar1 += event.duration;
        } else if (event.event_type === 'Educational'){
          bar2 += event.duration;
        } else {
          bar3 += event.duration;
        }
      })
      let totalHours = (bar1 + bar2 + bar3);
      bar1 = (bar1/totalHours) * 100
      bar2 = (bar2/totalHours) * 100
      bar3 = (bar3/totalHours) * 100

      bar1 = Math.round(bar1);
      bar2 = Math.round(bar2);
      bar3 = Math.round(bar3);

      if(totalHours > 0){
        this.setState({
          volunteers  : volunteers,
          bar1        : bar1,
          bar2        : bar2,
          bar3        : bar3,
          currentVol  : parsedlocalstorage
        });
      } else {
        this.setState({
          volunteers  : volunteers,
          currentVol  : parsedlocalstorage
        })
      }
    })
    .catch(err =>{
      throw err;
    })
  }
}



onDrop(files){
  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  upload.post(`/api/upload/${parsedlocalstorage.id}`)
  .attach('profilepic', files[0])
  .then((res) => {
  })
  .then((not) => {
    this.setState({ file: files[0] })
  })
}

onCoverDrop(files){
  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  console.log(files)
  upload.post(`/api/upload/cover/${parsedlocalstorage.id}`)
  .attach('coverpic', files[0])
  .then((res) => {
  })
  .then((not) => {
    this.setState({ coverfile: files[0] })
  })
}

onChange(files) {
  this.setState({
    file:files.target.files[0],
    currentVol: this.props.match.params
  });
}

defineVolunteerStatus(hours) {
  if (hours > 0 && hours < 20) {
    return "Bronze";
  } if (hours > 19 && hours < 40) {
    return "Silver";
  } if (hours > 39 && hours < 60) {
    return "Gold";
  } if (hours > 59) {
    return "Graduated";
  } else {
    return "New";
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
          eventDetails.push(<p className="profile-upcomingevents">Sign up for some events!</p>)
        } else {
          for (let item in volunteers) {
            let count = (parseInt(item)+1);
            eventDetails.push(<div>
            <p className="heading">{[count]}. {this.state.volunteers[item].event_description}</p>
            <p className="event">Location: </p><p className="event2">{this.state.volunteers[item].location}</p><br></br>
            <p className="event">Date: </p><p className="event2">{this.state.volunteers[item].event_date}</p><br></br>
            <p className="event">Start Time: </p><p className="event2">{this.state.volunteers[item].event_time.slice(0,10)}</p><br></br>
            <p className="event">Duration: </p><p className="event2">{this.state.volunteers[item].duration} hours</p><br></br>
            <p className="event">Event Type: </p><p className="event2">{this.state.volunteers[item].event_type}</p><br></br>
            <br></br>
            </div>)
          }
        }

return (
    <div className='userprofile-body'>
      <div className='basic-info-cover'>
        <Dropzone className = "iu-loadContainer3" onDrop={this.onCoverDrop}>
            {this.state.volunteers[0].cover_photo_url != undefined ? <img id="cover" className="iu-loadContainer" src={this.state.volunteers[0].cover_photo_url}></img> : <div className="iu-loadContainer">Upload a profile picture</div>}
        </Dropzone>
        <div className="userDetailContainer">
          <Dropzone className = "iu-loadContainer2" onDrop={this.onDrop}>
            {this.state.volunteers[0].pic_url != undefined ? <img className="iu-loadContainer" src={this.state.volunteers[0].pic_url}></img> : <div className="iu-loadContainer">Upload a profile picture</div>}
          </Dropzone>
          <br></br>
          <ul className="userDeets">
            <br></br><br></br>
            <h3 className="userDetails" id="name">{this.state.volunteers[0].name}</h3><br></br>
            <p className="userDetails">Email: </p><p className="detail">{this.state.volunteers[0].email}</p><br></br>
            <p className="userDetails">Location: </p><p className="detail">Vancouver, Canada</p><br></br>
            <p className="userDetails">Total volunteer hours:</p><p className="detail"> {this.state.volunteers[0].hours}</p><br></br>
          </ul>
        </div>
      </div>
    <div className="circleClass">
    <CircularProgressbar className="CircularProgressbar1" percentage={this.state.bar1} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar2" percentage={this.state.bar2} initialAnimation/>
    <CircularProgressbar className="CircularProgressbar3" percentage={this.state.bar3} initialAnimation/>
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
