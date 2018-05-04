import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Login from "./Login";
import Friends from './Friends';
import Home from "./Home";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Find your HERD.'
    };

  }

  render() {
    return (
        <div> HERD.
          <p><Link to='/login'>Login</Link> | <Link to='/friends'>Friends</Link></p>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/friends' component={Friends}/>
        {/* <Route path={"register"} component={Register}/> */}
        </div>
    );
  }
}

export default App;
