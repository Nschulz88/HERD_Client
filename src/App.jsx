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
      userLoggedIn: false
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.setUser = this.setUser.bind(this);
  
  }

  componentDidMount() {
    this.setState({userLoggedIn:            
      JSON.parse(localStorage.getItem("userLoggedIn"))
    });
    console.log("localStorage.userLoggedIn FROM COMP DID MOUNT", localStorage.userLoggedIn);

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
      userLoggedIn: false
    });
  }

  setUser(user) {
    console.log("setting user to", user);
    this.setState({ 
      user,
      userLoggedIn: true
    });
    console.log("localStorage.userLoggedIn", localStorage.userLoggedIn);
  }

  isOrganizer() {
    if (this.state.user && this.state.user.vol_org === "organizer") {
      return true
    } else {
      return false
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
          {this.state.user && this.state.userLoggedIn ? <span>Hey, {this.state.user.id } good to see you! </span> : '' }
          {this.state.userLoggedIn ? <a href='/' onClick={this.onLogoutClick}>Logout</a> : <a href='/login'>Login</a>}
          {this.state.userLoggedIn ? ' ' : ' | '}
          {this.state.userLoggedIn ? '' : registerLink}
          {this.isOrganizer() ? '| ' : ''}
          {this.isOrganizer() ? postEventLink : ''}
        </p>
      </div>
      <br></br>
      <Route exact path='/' component={MapApp}/>
      <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser}/> } />
      <Route path='/register' render={(props) => <Register {...props} setUser={this.setUser}/> }/>
      <Route exact path='/events' component={Events}/> 
      <Route path='/user/:id' component={Userprofile}/>
    </div>
   );
 }
}

export default App;
