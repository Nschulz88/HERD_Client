import React, { Component } from "react";
import { Button, FormGroup, FormControl, DropdownButton, MenuItem } from "react-bootstrap";
import "./Login_Register.css";
import axios from 'axios';



class Login extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);

    this.state={
    email: '',
    password: '',
    vol_org: 'vol',
    };
  }

  login(e){
    e.preventDefault();
    axios.post('/api/login', {
      email      : this.state.email,
      password      : this.state.password,
      vol_org       : this.state.vol_org
    }).then(result => {
      console.log('request complete', result.data.user);
      localStorage.setItem('userLoggedIn', true);

      this.props.setUser(result.data.user);
      this.props.isOrganizer(this.state.vol_org);
    });
    this.props.history.push("/");
  }

  handleChange(e) {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
    });
  }

  handleRadio(e) {
    this.setState({
      vol_org: e.target.id
    });
  }


  render() {
    console.log('Login', this.state);
    return (
      <div className="Login">
          <div className="login-content">
            <div className="login-header">
              <div className="avatar">
                <img src={require('./letter_H.png')} alt="logo" className="img-responsive"/>
              </div>
              <div>
                <h4>{this.state.vol_org === 'vol' ? "Join a HERD." : "Organize a HERD."}</h4>
              </div>
            </div>
            <form onSubmit={this.login.bind(this)}>
              <FormGroup name="login" bsSize="large">
                <DropdownButton
                  bsSize="large"
                  className="form-control"
                  id='dropdownBtn'
                  onChange={this.handleRadio}
                  title={this.state.vol_org === 'vol' ? "Volunteer" : "Organizer"}
                  >
                  <MenuItem value={this.state.vol_org} id="vol" onClick={this.handleRadio}>Volunteer</MenuItem>
                  <MenuItem value={this.state.vol_org} id="org" onClick={this.handleRadio}>Organizer</MenuItem>
                </DropdownButton>
                <FormControl
                  value={this.state.email}
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={this.handleChange}
                />
                <FormControl
                  value={this.state.password}
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  type="submit"
                  disabled={!this.state.password}
                >Login
              </Button>
            </form>
              <div className="login-footer">
                <a href="/register">Or Register here</a>
              </div>
          </div>
      </div>
    );
  }
}

export default Login;
