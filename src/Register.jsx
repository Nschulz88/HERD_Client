import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login_Register.css";

var pass_obj = {}

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handlePass = this.handlePass.bind(this);

    this.state = {
      username: '',
      full_name: '',
      organization: '',
      vol_org: '',
      hashed_pass: '',
    };
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
      this.setState({hashed_pass: pass_obj.password_conf})
    }
  }

  handleRadio(e) {
    this.setState({
      vol_org: e.target.id
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
                  disabled={!this.state.hashed_pass}
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
