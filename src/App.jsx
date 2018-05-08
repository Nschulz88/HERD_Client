import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Login from "./Login";
import Organizations from './Organizations';
import Register from "./Register";
import Events from "./Events";
import MapApp from './MapApp';
import Module from './Sidebar';
import Userprofile from './Userprofile';



class App extends Component {

 render() {
   return (
      <div>
        <div className="navBar">
          <a href = '/'><img className="image" src={"https://i.imgur.com/PHCgaoD.png"} alt=""></img></a>
          <p className="titles"><a href='/login'>Login |</a><a href='/register'> Register |</a><a href='/organizations'> Organizations | </a><a href='/events'> Events</a></p>
        </div>
        <br></br>
       <Route exact path='/' component={MapApp}/>
       <Route path='/login' component={Login}/>
       <Route path='/organizations' component={Organizations}/>
       <Route path='/register' component={Register}/>
       <Route exact path='/events' component={Events}/>
       <Route path='/events/:id' component={Module}/>
       <Route path='/user/:id' component={Userprofile}/>
      </div>
   );
 }
}

export default App;
