import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";



class Register extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
   }
  render() {
    console.log('Logging from Register...', this.props);
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
              <FormGroup name="full_name" bsSize="large">
                <FormControl
                  autofocus
                  type="text"
                  value=""
                  placeholder="Full name"
                />
              </FormGroup>
              <FormGroup name="email" bsSize="large">
                <FormControl
                  type="email"
                  placeholder="E-mail"
                />
              </FormGroup>
              <FormGroup name="organization" bsSize="large">
                <FormControl
                  type="text"
                  placeholder="Organization"
                />
              </FormGroup>
              <FormGroup name="password" bsSize="large">
                <FormControl
                  type="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup name="password_confirmation" bsSize="large">
                <FormControl
                  type="password"
                  placeholder="Password Confirmation"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                type="submit"
              >
                Login
              </Button>
              <div class="login-footer">
                <a href="/login">I already have an account</a>
              </div>
          </div>
      </div>
    );
  }
}

export default Register;
