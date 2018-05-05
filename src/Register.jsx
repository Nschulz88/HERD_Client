import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";



class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      full_name: '',
      organization: '',
      password_conf: '',
    };
  }

  handleChange(e) {
    var key = e.target.id
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
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
            <form>
              <FormGroup
                name="vol_org"
                bsSize="small"
              >
              <FormControl
                  type="radio"
                  name="optradio"
                  value="vol"
                />Volunteer
                <FormControl
                  type="radio"
                  name="optradio"
                  value="org"
                />Organizer
                <FormControl
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
                <FormControl
                  type="text"
                  id="organization"
                  placeholder="Organization"
                  value={this.state.organization}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <FormControl
                  type="password"
                  id="password_conf"
                  placeholder="Password Confirmation"
                  value={this.state.password_conf}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                type="submit"
              >
                Register
              </Button>
            </form>
            <div class="login-footer">
              <a href="/login">I already have an account</a>
            </div>
          </div>
      </div>
    );
  }
}

export default Register;
