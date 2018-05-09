import React, { Component } from "react";
import { Button, FormGroup, FormControl, DropdownButton, MenuItem } from "react-bootstrap";
import "./Login_Register.css";
import axios from 'axios';

var pass_obj = {}

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.registerOrganizer = this.registerOrganizer.bind(this);
    this.state = {
      username: '',
      full_name: '',
      organization: '',
      vol_org: 'vol', //set to vol as default !
      unhashed_pass: '',
    };
  }

  registerOrganizer(e){
    e.preventDefault()
    if (this.state.vol_org === 'org'){
      console.log('organizer!')
      axios({
        method: 'post',
        url: '/organizers',
        data: {
          username          : this.state.username,
          full_name         : this.state.full_name,
          organization      : this.state.organization,
          vol_org           : this.state.vol_org,
          unhashed_pass     : this.state.unhashed_pass,
        }
      });
    } else {
      console.log('volunteers!')
      axios({
        method: 'post',
        url: '/volunteers',
        data: {
          username          : this.state.username,
          full_name         : this.state.full_name,
          vol_org           : this.state.vol_org,
          unhashed_pass     : this.state.unhashed_pass,
        }
      });
    }
    this.props.history.push("/");
  }
 

  handleChange(e) {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
    });
  }

  handlePass(e){
    var key = e.target.id
    pass_obj[key] = e.target.value
    if(pass_obj.password === pass_obj.password_conf){
      this.setState({unhashed_pass: pass_obj.password_conf})
    }
  }

  handleRadio(e) {
    console.log("I am hitting handleRadio", e.target.id)
    this.setState({
      vol_org: e.target.id
    });
  }

  render() {

     const organizationField = <FormControl
     type="text"
     id="organization"
     placeholder="Organization"
     value={this.state.organization}
     onChange={this.handleChange}
     />


    console.log(this.state)
    return (
      <div className="Login">
          <div className="login-content">
            <div className="login-header">
              <div className="avatar">
                <img src={require('./letter_H.png')} alt="logo" className="img-responsive"/>
              </div>
              <div>
                <h4>Become a HERD. member</h4>
              </div>
            </div>
            <form onSubmit={this.registerOrganizer.bind(this)}>
              <FormGroup
                name="vol_org"
                bsSize="large"
              >
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
                  autoFocus
                  type="text"
                  id="full_name"
                  placeholder="Full name"
                  value={this.state.full_name}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="email"
                  id="username"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {this.state.vol_org === 'org' ? organizationField : ''}
                <FormControl
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePass}
                />
                <FormControl
                  type="password"
                  id="password_conf"
                  placeholder="Password Confirmation"
                  value={this.state.password_conf}
                  onChange={this.handlePass}
                />
              </FormGroup>
                <Button
                  block
                  bsSize="large"
                  type="submit"
                  disabled={!this.state.unhashed_pass}
                >
                  Register
                </Button>
            </form>
            <div className="login-footer">
              <a href="/login">I already have an account</a>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;
