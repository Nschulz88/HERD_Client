import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";



class Login extends Component {
  constructor(props){
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state={
    email: undefined,
    password: undefined
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("THIS IS MY STATE:", this.state);

  }

  handleSubmit = event => {
    event.preventDefault();
  }


  render() {
    console.log('Login', this.props);
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
              <FormGroup controlId="email" bsSize="large">
                <FormControl
                  autofocus
                  value={this.state.email}
                  type="email"
                  placeholder="E-mail"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <FormControl
                  value={this.state.password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
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
      </div>
    );
  }
}

export default Login;
