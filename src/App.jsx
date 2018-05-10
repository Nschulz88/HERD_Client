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

    this.state = {};

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.setUser = this.setUser.bind(this);
    // this.isOrganizer = this.isOrganizer.bind(this);


  }

  onLogoutClick(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/logout',
    });
    this.setState({user: null})
  }

  setUser(user) {
    console.log("setting user to", user);
    this.setState({ user });
    console.log("Logging this.state.user", this.state.user.vol_org)
  }

  isOrganizer() {
    if (this.state.user && this.state.user.vol_org === "organizer") {
      return true
    } else {
      return false
    }
  }

 render() {
  const postEventLink = <a href='/events'> Looking for volunteers </a>
  const registerLink = <a href='/register'> Register </a>

   return (
      <div>
        <div className="navBar">
          <a href = '/'><img className="image" src={"https://i.imgur.com/PHCgaoD.png"} alt=""></img></a>
          <p className="titles">
            {this.state.user ? <a href='/' onClick={this.onLogoutClick}> Logout</a> : <a href='/login'> Login </a>} |
            {this.state.user ? '' : registerLink} |
            {this.isOrganizer() ? postEventLink : ''}
          </p>
        </div>
        <br></br>
       <Route exact path='/' component={MapApp}/>
       <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser}/> } />
       <Route path='/register' component={Register}/>
       <Route exact path='/events' component={Events}/>
       <Route path='/user/:id' component={Userprofile}/>
      </div>
   );
 }
}

export default App;
