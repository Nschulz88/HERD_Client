import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";



class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
   }
  render() {
    console.log('Login', this.props);
    return (
      <div className="Login">
        <form className="login-dialog login-form">
          <div className="login-content">
            <div className="login-header">
              <div className="avatar">
                <img src={require('./letter_H.png')} alt="logo" className="img-responsive"/>
              </div>
              <div>
                <h4>Login to HEARD</h4>
              </div>
            </div>				
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value="Email"
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value="Password"
                  type="password"
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
                <a href="/register">Or Register here</a>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
