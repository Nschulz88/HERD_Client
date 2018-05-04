import React, {Component} from 'react';
import {getFriends} from './friends-data-svc';

class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount(){
    getFriends()
      .then((friends) => {
        this.setState({
          loading: false, friends: friends
        });
      })
  }
  render(){
    const main = this.state.loading ? <h2>Makin' Friends...</h2> : <div>
        <h2>These are your friends</h2>
        <ul>
          {this.state.friends.map(friend => {
            return <li key={friend.id}>{friend.name}</li>
          })}
          </ul>
      </div>
    return <div>
      {main}
    </div>
  }
}

export default Friends;