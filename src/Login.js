import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
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
    vol_org: '',
    };
  }

  login(e){
    axios({
        method: 'post',
        url: '/login',
        data: {
          username      : this.state.email,
          password      : this.state.password,
          vol_org       : this.state.vol_org
        }
      });
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
                <h4>Join your HERD.</h4>
              </div>
            </div>
            <form onSubmit={this.login.bind(this)}>
              <FormGroup name="login" bsSize="large">
                <FormControl
                    type="radio"
                    name="optradio"
                    id="vol"
                    value={this.state.vol_org}
                    onChange={this.handleRadio}
                />Volunteer
                <FormControl
                  type="radio"
                  id="org"
                  name="optradio"
                  value={this.state.vol_org}
                  onChange={this.handleRadio}
                />Organizer
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
              <div class="login-footer">
                <a href="/register">Or Register here</a>
              </div>
          </div>
      </div>
    );
  }
}

export default Login;
