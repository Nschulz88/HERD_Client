import React, {Component} from 'react';
import {getVolunteers} from './friends-data-svc';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount(){
    getVolunteers()
      .then((volunteers) => {
        this.setState({
          loading: false, volunteers: volunteers
        });
      })
  }
  render(){
    const main = this.state.loading ? <h2>Makin' Friends...</h2> : <div>
        <h2>These are your Volunteers</h2>
        <ul>
          {this.state.volunteers.map(volunteer => {
            return <li key={volunteer.vol_name}>{volunteer.vol_name} - {volunteer.vol_email}</li>
          })}
          </ul>
      </div>
    return <div>
      {main}
    </div>
  }
}

export default Friends;