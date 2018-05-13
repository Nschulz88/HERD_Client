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
    console.log(localStorage)
    var userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    var userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      this.isOrganizer(JSON.parse(userInfo).vol_org)
    }
    //console.log("ROHIT DHAND",JSON.parse(userInfo));


    this.setState({
      userLoggedIn:userLoggedIn,
      user: JSON.parse(userInfo)
    });
    console.log(this.state.user);
  }

  onLogoutClick(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/logout',
    });
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userInfo')
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
      <Route exact path='/' component={MapApp} passedUser={this.state.user}/>
      <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser} isOrganizer={this.isOrganizer}/> } />
      <Route path='/register' render={(props) => <Register {...props} setUser={this.setUser} isOrganizer={this.isOrganizer}/> }/>
      <Route exact path='/events' component={Events}/>
      <Route path='/user/:id' component={Userprofile}/>
    </div>
   );
 }
}

export default App;
