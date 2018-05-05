import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';

import Login from "./Login";
import Companies from './Companies';
import Home from "./Home";
import Register from "./Register";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Find your HERD.'
    };

  }

  // <img class="image" src = {""}></img>

  render() {
    return (
        <div className="Logo">HERD. <p class="titles"><Link to='/login'>Login</Link> | <Link to='/register'>Register</Link> | <Link to='/companies'>Companies</Link></p>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/companies' component={Companies}/>
        <Route path='/register' component={Register}/>
        </div>
    );
  }
}

export default App;
