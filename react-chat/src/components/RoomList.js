import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return (
      <div className='roomlist'>
        <h1 className='title'>React Bloc Chat</h1>
        <ul className='sidebar-list'>
          {
            this.state.rooms.map((room, index) =>
            <li className='rooms' key={index}>{room.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
export default RoomList;
