import React, {Component} from 'react';
import {getVolunteers} from './friends-data-svc';

class Companies extends Component {
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
        <div class = "companies">Companies:
        </div>
    );
  }

}

export default Companies;
