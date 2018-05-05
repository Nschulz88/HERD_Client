import React, {Component} from 'react';
import {getVolunteers} from './friends-data-svc';

class Organizations extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount(){

  }
  render() {
    return (
        <div class = "organizations">Organizations

          <div class = "box">
          </div>

        </div>
    );
  }

}

export default Organizations;
