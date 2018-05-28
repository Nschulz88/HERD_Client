import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
    var userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
    this.isOrganizer(JSON.parse(userInfo).vol_org)
    }

    this.setState({
      userLoggedIn: userLoggedIn,
      user: JSON.parse(userInfo)
    });
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
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.setState({
      user: user,
      userLoggedIn: true
    });
  }

  isOrganizer() {
    var userLoggedIn = JSON.parse(localStorage.getItem("userInfo"));
    if (userLoggedIn.vol_org === "organizer" || userLoggedIn.organization_name ) {  // N: this is hacky, but has to stay this way so nav bar displays correct after registration !!!
      return true
    } else {
      return false
    }
  }

 render() {

  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
          <a href="/"><Image responsive className='navbar-logo' src="https://i.imgur.com/PHCgaoD.png" alt="herd-logo"/></a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.user && this.state.userLoggedIn ? <NavItem><div>Hey, {this.state.user.name }!</div></NavItem> : '' }
            {this.state.user && this.isOrganizer() === false ? <LinkContainer to={'/user/' + this.state.user.id}><NavItem>My Profile</NavItem></LinkContainer> : ''}
            {this.state.userLoggedIn ? '' : <LinkContainer to='/register/'><NavItem>Register</NavItem></LinkContainer>}
            {this.state.userLoggedIn && this.isOrganizer() ? <LinkContainer to='/events/'><NavItem>Post Event</NavItem></LinkContainer> : ''}
            {this.state.userLoggedIn ? <LinkContainer to='/' onClick={this.onLogoutClick}><NavItem>Logout</NavItem></LinkContainer> : <LinkContainer to='/login/'><NavItem>Login</NavItem></LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path='/' component={MapApp} passedUser={this.state.user}/>
      <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser}/> } />
      <Route path='/register' render={(props) => <Register {...props} setUser={this.setUser}/> }/>
      <Route exact path='/events' component={Events}/>
      <Route path='/user/:id' component={Userprofile}/>
    </div>
   );
 }
}

export default App
