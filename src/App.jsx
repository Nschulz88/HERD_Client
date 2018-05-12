import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Login from "./Login";
import Register from "./Register";
import Events from "./Events";
import MapApp from './MapApp';
import Userprofile from './Userprofile';


class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.setUser = this.setUser.bind(this);
    this.isOrganizer = this.isOrganizer.bind(this);

  }

  componentDidMount() {

    var userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    //var userInfo = {id: '1', email:'zzz@zzz.com', name:'zzz'};
    var userInfo = localStorage.getItem("userInfo");
    this.isOrganizer(JSON.parse(userInfo).vol_org)
    console.log("ROHIT DHAND",JSON.parse(userInfo));
   
    this.setState({userLoggedIn:userLoggedIn, user: JSON.parse(userInfo)         
      //JSON.parse(localStorage.getItem("userLoggedIn"))
    });
    console.log(this.state.user);
    // console.log("localStorage.userLoggedIn FROM COMP DID MOUNT", localStorage.userLoggedIn);
    // console.log("-----------this.state.user FROM COMP DID MOUNT", this.state);
  


  }

  onLogoutClick(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/logout',
    });
    localStorage.removeItem('userLoggedIn');
    this.setState({
      user: null,
      userLoggedIn: false,
      isOrganizer: false
    });
  }

  setUser(user) {
  
    localStorage.setItem('userLoggedIn', true);
    localStorage.setItem('userInfo',JSON.stringify(user));
    this.setState({ 
      user: user,
      userLoggedIn: true
    });
    console.log("localStorage.userLoggedIn", localStorage.userLoggedIn);
    console.log("this.state.user in setUser>>>>>", this.state.user);

  }

  isOrganizer(userType) {
    if (userType === "org"|| userType==="organizer")  {
      this.setState({
        isOrganizer: true
      })
    } else {
      this.setState({
        isOrganizer: false
      })
    }
  }

 render() {
  const postEventLink = <a href='/events'>Looking for volunteers</a>
  const registerLink = <a href='/register'>Register</a>

// NOTE FOR MAY 11th (by Natalie) -- would like to show username on login, but carrot acces due to different namings when user is organizer versus user is volunteer
// ALSO I'm assuming, setUser doesnt get passed into Events and UserProfile!
  return (
    <div>
      <div className="navBar">
        <a href = '/'><img className="image" src={"https://i.imgur.com/PHCgaoD.png"} alt=""></img></a>
        <p className="titles">
          {this.state.user && this.state.userLoggedIn ? <span>Hey, {this.state.user.name } good to see you! </span> : '' }
          {this.state.userLoggedIn ? <a href='/' onClick={this.onLogoutClick}>Logout</a> : <a href='/login'>Login</a>}
          {this.state.userLoggedIn ? ' ' : ' | '}
          {this.state.userLoggedIn ? '' : registerLink}
          {this.state.userLoggedIn && this.state.isOrganizer ? '| ' : ''}
          {this.state.userLoggedIn && this.state.isOrganizer ? postEventLink : ''}
        </p>
      </div>
      <br></br>
      <Route exact path='/' component={MapApp}/>
      <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser} isOrganizer={this.isOrganizer}/> } />
      <Route path='/register' render={(props) => <Register {...props} setUser={this.setUser} isOrganizer={this.isOrganizer}/> }/>
      <Route exact path='/events' component={Events}/> 
      <Route path='/user/:id' component={Userprofile}/>
    </div>
   );
 }
}

export default App;
