import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Login from "./Login";
import Organizations from './Organizations';
import Home from "./Home";
import Register from "./Register";
import Events from "./Events";
import Users from "./Users";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Find your HERD.'
    };

  }

  // <img class="image" src = {"https://image.ibb.co/fNO8on/HerdLogo.png"}></img>

  render() {
    return (
        <div class = "Logo"> <a href = '/'><img class="image" src = {"https://image.ibb.co/fNO8on/HerdLogo.png"}></img></a> <p class="titles"><a href='/login'>Login</a> | <a href='/register'>Register</a> | <a href='/organizations'>Organizations</a></p>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/organizations' component={Organizations}/>
        <Route path='/register' component={Register}/>
        <Route path='/events' component={Events}/>
        <Route path='/users' component={Users}/>
        </div>
    );
  }
}

export default App;
