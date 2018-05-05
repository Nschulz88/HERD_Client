import React, { Component } from 'react';


class Users extends Component {

  render() {
    console.log('Login', this.props);
    return (
      <div>
        <h1 class="User">Users</h1>
      </div>
    );
  }
}

export default Users;
