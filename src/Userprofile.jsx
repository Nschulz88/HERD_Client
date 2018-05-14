import React, { Component } from "react";
import CircularProgressbar from 'react-circular-progressbar';
import axios from 'axios';
import 'react-images-uploader/font.css';
import './profileStyles.css';
import './Userprofile.css';
import Dropzone from 'react-dropzone';
import upload from 'superagent';


// Check out node client library
// <img className="pic" src="https://image.ibb.co/m1Bq8n/Sam.png"/>

class Userprofile extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      volunteers: [],
    };

    this.defineVolunteerStatus = this.defineVolunteerStatus.bind(this);
  }


componentDidMount() {
  console.log("LOLSWOTSDGSLDGSKDGNK");
  console.log(localStorage);
  const parsedlocalstorage = JSON.parse(localStorage.getItem("userInfo"))

  if(parsedlocalstorage){
    axios.get(`/api/volunteers/${parsedlocalstorage.id}`, {
    }).then(res => {
      const volunteers = res.data;
      console.log("theawesome",volunteers);
      this.setState({ volunteers: volunteers });
      console.log(this.state.volunteers[0].name)
    })
    .catch(err =>{
      throw err;
    })
  }
}

onDrop(files){
  console.log(files);
  upload.post('/api/upload')
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
          Loading...
        </div>
      )}

return (
    <div className='userprofile-body'>

      <Dropzone onDrop={this.onDrop}>
        <div>
          Try dropping a file here;
        </div>
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
