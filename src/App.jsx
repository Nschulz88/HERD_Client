import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Login from "./Login";
import Friends from './Friends';

function Greeter({match}){
  return <h1>Hi, {match.params.person}</h1>
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Find your HERD.'
    };

  }

  render() {
    return (
        <div> HEllo 
          <p><Link to='/login'>Login</Link> | <Link to='/friends'>Friends</Link></p>
        <Route path='/login' component={Login}/>
        <Route path='/greet/:person' component={Greeter}/>
        <Route path='/friends' component={Friends}/>
        {/* <Route path={"register"} component={Register}/> */}
        </div>
    );
  }
}

export default App;
