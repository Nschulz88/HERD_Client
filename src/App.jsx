import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Login from "./Login";
import Organizations from './Organizations';
import Register from "./Register";
import Events from "./Events";
import MapApp from './MapApp'



class App extends Component {

 render() {
   return (
      <div>
        <div className="navBar">
          <a href = '/'><img className="image" src={"https://i.imgur.com/PHCgaoD.png"} alt=""></img></a>
          <p className="titles"><a href='/login'>Login</a> | <a href='/register'>Register</a> | <a href='/organizations'>Organizations</a></p>
        </div>
       <Route exact path='/' component={MapApp}/>
       <Route path='/login' component={Login}/>
       <Route path='/organizations' component={Organizations}/>
       <Route path='/register' component={Register}/>
       <Route path='/events' component={Events}/>
      </div>
   );
 }
}

export default App;
