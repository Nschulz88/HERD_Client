import React, { Component } from 'react';


class Events extends Component {

  render() {
    console.log('Login', this.props);
    return (
      <div>
        <h1 class="Event">Event</h1>
      </div>
    );
  }
}

export default Events;
