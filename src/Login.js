import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";



class Login extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state={
    email: '',
    password: ''
    };
  }

  handleChange(e) {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
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
            <form>
              <FormGroup name="login" bsSize="large">
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
